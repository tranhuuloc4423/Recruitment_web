const Candidate = require('../models/candidateModel')
const cosineSimilarity = require('compute-cosine-similarity')

function cleanText(text) {
  return text.replace(/<[^>]*>/g, ' ').trim()
}

function tokenize(text) {
  return text.toLowerCase().split(/\W+/).filter(Boolean)
}

function getFrequencyVector(tokens) {
  const freq = {}
  tokens.forEach((token) => {
    freq[token] = (freq[token] || 0) + 1
  })
  return freq
}

function getVocabulary(freq1, freq2) {
  const vocab = new Set()
  Object.keys(freq1).forEach((token) => vocab.add(token))
  Object.keys(freq2).forEach((token) => vocab.add(token))
  return Array.from(vocab)
}

function vectorFromFreq(freq, vocab) {
  return vocab.map((token) => freq[token] || 0)
}

function textCosineSimilarity(text1, text2) {
  const tokens1 = tokenize(cleanText(text1))
  const tokens2 = tokenize(cleanText(text2))
  const freq1 = getFrequencyVector(tokens1)
  const freq2 = getFrequencyVector(tokens2)
  const vocab = getVocabulary(freq1, freq2)
  const vec1 = vectorFromFreq(freq1, vocab)
  const vec2 = vectorFromFreq(freq2, vocab)
  return cosineSimilarity(vec1, vec2)
}

async function calculateSuitability(post, candidate) {
  const postDesc = post.desc || ''
  const candidateDesc =
    (candidate.other_info && candidate.other_info.desc) || ''

  const postSkills = Array.isArray(post.skills)
    ? post.skills.map((s) => s.name || '').join(' ')
    : ''
  const candidateSkills =
    candidate.other_info && Array.isArray(candidate.other_info.skills)
      ? candidate.other_info.skills.map((s) => s.name || '').join(' ')
      : ''

  const similarityDesc = textCosineSimilarity(postDesc, candidateDesc)
  const similaritySkills = textCosineSimilarity(postSkills, candidateSkills)

  const totalScore = similarityDesc * 0.6 + similaritySkills * 0.4
  return totalScore
}

async function rankCandidatesForPost(post) {
  const candidates = await Candidate.find({ _id: { $in: post.applied } })
  const scores = []
  for (const candidate of candidates) {
    const score = await calculateSuitability(post, candidate)
    scores.push({ candidate, score })
  }
  scores.sort((a, b) => b.score - a.score)
  return scores
}

module.exports = { rankCandidatesForPost }
