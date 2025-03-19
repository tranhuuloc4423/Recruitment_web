const Post = require('../models/postModel')
const Candidate = require('../models/candidateModel')
const Recruiter = require('../models/recruiterModel')
const Admin = require('../models/addressModel')

const { pipeline } = require('@huggingface/transformers')

let embeddingModel = null

// Hàm khởi tạo mô hình embedding nếu chưa có
const loadModel = async () => {
  if (!embeddingModel) {
    // Ví dụ sử dụng model sentence-transformers (các tham số có thể điều chỉnh)
    embeddingModel = await pipeline(
      'feature-extraction',
      'sentence-transformers/all-MiniLM-L6-v2'
    )
  }
}
loadModel()

// Hàm chuyển đổi mảng kỹ năng thành chuỗi văn bản
const getTextFromSkills = (skills) => {
  if (!skills || !Array.isArray(skills)) return ''
  return skills.map((skill) => `${skill.name} ${skill.value || ''}`).join(' ')
}

// Hàm chuyển đổi địa chỉ thành chuỗi (ở đây lấy phần province và district của Post.location.address)
const getTextFromAddress = (addressArr) => {
  if (!addressArr || !Array.isArray(addressArr) || addressArr.length === 0)
    return ''
  const first = addressArr[0]
  return `${first.province?.name || ''} ${first.district?.name || ''}`
}

// Hàm chuyển đổi mảng wforms thành chuỗi
const getTextFromWforms = (wforms) => {
  if (!wforms || !Array.isArray(wforms)) return ''
  return wforms.map((item) => `${item.name} ${item.value || ''}`).join(' ')
}

// Hàm tính cosine similarity giữa 2 vector số
const computeCosineSimilarity = (vecA, vecB) => {
  const dot = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0)
  const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0))
  const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0))
  if (normA === 0 || normB === 0) return 0
  return dot / (normA * normB)
}

// Hàm lấy embedding từ một chuỗi văn bản và đảm bảo trả về mảng số
const computeEmbedding = async (text) => {
  const embeddingOutput = await embeddingModel(text)
  let embedding = embeddingOutput[0]

  // Nếu embedding không phải là mảng, thử convert nó
  if (!Array.isArray(embedding)) {
    try {
      embedding = Array.from(embedding)
    } catch (e) {
      throw new Error('Unable to convert embedding to array')
    }
  } else {
    // Nếu phần tử đầu tiên cũng là mảng, thực hiện flatten
    if (embedding.length > 0 && Array.isArray(embedding[0])) {
      embedding = embedding.reduce((acc, cur) => acc.concat(cur), [])
    }
  }
  return embedding
}

// Hàm xếp hạng các ứng viên cho bài tuyển dụng theo postId
const rankCandidatesForPost = async (postId) => {
  await loadModel()

  // Lấy bài tuyển dụng
  const post = await Post.findById(postId)
  if (!post) throw new Error('Post not found')

  // Lấy danh sách các ứng viên đã apply (lưu trong post.applied)
  const candidates = await Candidate.find({ _id: { $in: post.applied } })

  // Chuẩn bị dữ liệu cho bài tuyển dụng
  const postSkillsText = getTextFromSkills(post.skills)
  const postAddressText = getTextFromAddress(post.location.address)

  // Tính embedding cho các trường của bài tuyển dụng
  const postSkillsEmbedding = await computeEmbedding(postSkillsText)
  const postAddressEmbedding = await computeEmbedding(postAddressText)

  // Xử lý trường hợp wforms: lấy thông tin từ recruiter/admin dựa trên post.authorType
  let wformsText = ''
  if (post.authorType === 'recruiter') {
    const recruiter = await Recruiter.findById(post.author)
    if (recruiter && recruiter.other_info && recruiter.other_info.wforms) {
      wformsText = getTextFromWforms(recruiter.other_info.wforms)
    }
  } else if (post.authorType === 'admin') {
    const admin = await Admin.findById(post.author)
    if (admin && admin.other_info && admin.other_info.wforms) {
      wformsText = getTextFromWforms(admin.other_info.wforms)
    }
  }
  let postWformsEmbedding = null
  if (wformsText) {
    postWformsEmbedding = await computeEmbedding(wformsText)
  }

  // Lặp qua từng ứng viên và tính điểm dựa trên độ tương đồng
  const rankedCandidates = []
  for (const candidate of candidates) {
    // Lấy chuỗi văn bản của các trường của ứng viên
    const candidateSkillsText = getTextFromSkills(candidate.target.skills)
    // Với địa chỉ, giả sử chỉ lấy tên tỉnh/thành của candidate.target.address
    const candidateAddressText = candidate.target.address?.province?.name || ''
    const candidateWformsText = getTextFromWforms(candidate.target.wforms)

    // Tính embedding cho từng trường của ứng viên
    const candidateSkillsEmbedding = await computeEmbedding(candidateSkillsText)
    const candidateAddressEmbedding = await computeEmbedding(
      candidateAddressText
    )

    // Tính điểm tương đồng cho từng trường
    const skillsScore = computeCosineSimilarity(
      postSkillsEmbedding,
      candidateSkillsEmbedding
    )
    const addressScore = computeCosineSimilarity(
      postAddressEmbedding,
      candidateAddressEmbedding
    )
    let wformsScore = 0
    if (postWformsEmbedding && candidateWformsText) {
      const candidateWformsEmbedding = await computeEmbedding(
        candidateWformsText
      )
      wformsScore = computeCosineSimilarity(
        postWformsEmbedding,
        candidateWformsEmbedding
      )
    }

    // Tính điểm tổng hợp (ví dụ: chia trung bình các điểm; nếu không có wforms thì tính trung bình của 2 chỉ số)
    const totalScore = postWformsEmbedding
      ? (skillsScore + addressScore + wformsScore) / 3
      : (skillsScore + addressScore) / 2

    rankedCandidates.push({ candidate, score: totalScore })
  }

  // Sắp xếp các ứng viên theo điểm từ cao xuống thấp
  rankedCandidates.sort((a, b) => b.score - a.score)
  return rankedCandidates
}

module.exports = { rankCandidatesForPost }
