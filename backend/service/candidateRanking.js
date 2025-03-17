const { pipeline } = require('@huggingface/transformers')

const computeCosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0)
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0))
  const normB = Math.sqrt(vecB.reduce((sum, a) => sum + a * a, 0))
  return dotProduct / (normA * normB)
}

const generateTextForPost = (post) => {
  const skillsText = post.skills
    .map((skill) => `${skill.name} ${skill.value}`)
    .join(', ')
  const locationText = post.location.address
    .map((addr) => addr.province.name)
    .join(', ')
  return `${skillsText}. Location: ${locationText}. Salary: ${
    post.salary
  }. Request: ${post.request || ''}`
}

const generateTextForCandidate = (candidate) => {
  const skillsText = candidate.target.skills
    .map((skill) => `${skill.name} ${skill.value}`)
    .join(', ')
  const locationText = candidate.target.address?.province?.name || ''
  return `${skillsText}. Location: ${locationText}.`
}

const getEmbeddingVector = (embeddingResult) => {
  let vec = embeddingResult[0]
  if (!Array.isArray(vec)) {
    vec = Array.from(vec)
  }
  if (Array.isArray(vec) && Array.isArray(vec[0])) {
    const n = vec.length
    const dim = vec[0].length
    const avg = new Array(dim).fill(0)
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < dim; j++) {
        avg[j] += vec[i][j]
      }
    }
    for (let j = 0; j < dim; j++) {
      avg[j] /= n
    }
    return avg
  }
  return vec
}

const rankCandidates = async (post, candidates) => {
  const featureExtractor = await pipeline(
    'feature-extraction',
    'sentence-transformers/all-MiniLM-L6-v2'
  )

  const postText = generateTextForPost(post)
  const postEmbeddingResult = await featureExtractor(postText)
  const postEmbedding = getEmbeddingVector(postEmbeddingResult)

  const scoredCandidates = await Promise.all(
    candidates.map(async (candidate) => {
      const candidateText = generateTextForCandidate(candidate)
      const candidateEmbeddingResult = await featureExtractor(candidateText)
      const candidateEmbedding = getEmbeddingVector(candidateEmbeddingResult)
      const similarity = computeCosineSimilarity(
        postEmbedding,
        candidateEmbedding
      )

      let salaryBonus = 0
      if (post.salary && candidate.target.target_money) {
        const { min_money, max_money } = candidate.target.target_money
        if (post.salary >= min_money && post.salary <= max_money) {
          salaryBonus = 0.1
        }
      }

      const overallScore = similarity + salaryBonus
      return { candidate, overallScore }
    })
  )

  scoredCandidates.sort((a, b) => b.overallScore - a.overallScore)

  const required = post.quantity || scoredCandidates.length
  return scoredCandidates.slice(0, required).map((item) => item.candidate)
}

module.exports = { rankCandidates }
