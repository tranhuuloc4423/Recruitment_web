import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getAllPostConfirmed } from '../redux/api/post'
import Post from '../components/Post'
import PostDetails from '../components/PostDetails'
import BasicPagination from '../components/BasicPagination'
import Loading from '../components/Loading'
import { IoClose } from 'react-icons/io5'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'

const Main = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [history, setHistory] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { currentRole } = useSelector((state) => state.app)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPostConfirmed()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    fetchPosts()
    const storedHistory =
      JSON.parse(localStorage.getItem('searchHistory')) || []
    setHistory(storedHistory)
  }, [])

  const calculateMatchScore = (post) => {
    if (!currentRole?.target) return 0
    const { skills, target_money, types, address, wforms } = currentRole.target
    let score = 0

    if (skills?.length > 0) {
      const postSkills = post.skills.map((s) => s.value)
      const matchedSkills = postSkills.filter((s) =>
        skills.some((skill) => skill.value === s)
      )
      score += (matchedSkills.length / skills.length) * 30
    }

    if (address) {
      if (post?.location?.address[0]?.province?.code === address.code) {
        score += 25
      }
    }

    if (target_money) {
      const salaryInMillions = post.salary / 1000000
      if (
        salaryInMillions >= target_money.min_money &&
        salaryInMillions <= target_money.max_money
      ) {
        score += 25
      }
    }

    if (types?.length > 0) {
      const postTypes = post.types.map((s) => s.value)
      const matchedTypes = postTypes.filter((s) =>
        types.some((type) => type.value === s)
      )
      score += (matchedTypes.length / types.length) * 10
    }

    if (wforms?.length > 0) {
      const postWforms = post.wforms.map((s) => s.value)
      const matchedWforms = postWforms.filter((s) =>
        wforms.some((wform) => wform.value === s)
      )
      score += (matchedWforms.length / wforms.length) * 10
    }

    return score
  }

  const sortPosts = (postsToSort) => {
    return [...postsToSort].sort((a, b) => {
      const scoreA = calculateMatchScore(a)
      const scoreB = calculateMatchScore(b)
      if (scoreB !== scoreA) return scoreB - scoreA
      return b.views - a.views
    })
  }

  const filterPostsBySearch = (searchTerm) => {
    if (!searchTerm) return sortPosts(posts)
    const term = searchTerm.toLowerCase()
    const filtered = posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(term)
      const skillsMatch = post.skills?.some((skill) =>
        skill.name?.toLowerCase().includes(term)
      )
      const locationMatch = post.location?.address?.[0]?.province?.name
        ?.toLowerCase()
        .includes(term)
      return titleMatch || skillsMatch || locationMatch
    })
    return sortPosts(filtered)
  }

  const filterPostsByFrame = () => {
    const filter = JSON.parse(localStorage.getItem('filterFrame')) || {}
    const { skills, target_money, address, types, wform } = filter

    const filtered = posts.filter((post) => {
      const addressMatch = address?.code
        ? post?.location?.address[0]?.province?.code === address.code
        : true
      const skillsMatch =
        skills?.length > 0
          ? skills.every((skill) =>
              post.skills.some((s) => s.value === skill.value)
            )
          : true
      const targetMoneyMatch = target_money
        ? post.salary / 1000000 >= target_money.min_money &&
          post.salary / 1000000 <= target_money.max_money
        : true

        // const typesMatch =
        // types?.length > 0
        //   ? types.every((type) =>
        //       post.type.some((s) => s.value === type.value)
        //     )
        //   : true
      return addressMatch && skillsMatch && targetMoneyMatch
    })
    return sortPosts(filtered)
  }

  const handleSearch = (searchTerm) => {
    const sortedFiltered = filterPostsBySearch(searchTerm)
    setFilteredPosts(sortedFiltered)
    if (searchTerm.trim()) {
      saveToHistory(searchTerm.trim())
    }
  }

  const saveToHistory = (term) => {
    const updatedHistory = [...new Set([term, ...history])].slice(0, 10)
    setHistory(updatedHistory)
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory))
  }

  const handleRemoveSuggestion = (index) => {
    const updatedSuggestions = history.filter((_, i) => i !== index)
    setHistory(updatedSuggestions)
    localStorage.setItem('searchHistory', JSON.stringify(updatedSuggestions))
  }

  const handlePostClick = (postId) => {
    setSelectedPost(postId)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPost(null)
  }

  const handleApplyFilter = () => {
    const filtered = filterPostsByFrame()
    setFilteredPosts(filtered)
    setCurrentPage(1)
    if (filtered.length > 0) {
      setSelectedPost(filtered[0]._id)
    } else {
      setSelectedPost(null)
    }
  }

  useEffect(() => {
    if (posts.length > 0 && currentRole) {
      const sortedPosts = sortPosts(posts)
      setFilteredPosts(sortedPosts)
      setSelectedPost(sortedPosts[0]?._id || null)
    }
  }, [posts, currentRole])

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    return filteredPosts.slice(startIndex, endIndex)
  }, [filteredPosts, currentPage])

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center mx-auto">
      {/* SearchBar và FilterPanel */}
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        <SearchBar
          onSearch={handleSearch}
          history={history}
          onRemoveSuggestion={handleRemoveSuggestion}
        />
        <FilterBar onApplyFilter={handleApplyFilter} />
      </div>

      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col">
          
          <span className="heading-3">
            <span className="text-primary font-semibold text-3xl">
              {filteredPosts?.length}
            </span>{' '}
            công việc đã được tìm thấy
          </span>
        </div>
        {posts ? (
          <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Danh sách bài viết */}
              <div className="w-full lg:w-1/3 flex flex-col gap-2 max-h-[calc(100vh-100px)] overflow-y-auto">
                {paginatedPosts.map((post) => (
                  <div
                    key={post._id}
                    onClick={() => handlePostClick(post._id)}
                    className="cursor-pointer"
                  >
                    <Post post={post} select={selectedPost} />
                  </div>
                ))}
              </div>

              {/* Phần chi tiết bài viết - chỉ hiển thị trên desktop */}
              <div className="hidden lg:block lg:w-2/3 max-h-[calc(100vh-100px)] overflow-y-auto">
                {selectedPost && <PostDetails id={selectedPost} />}
              </div>
            </div>

            {/* Phân trang */}
            {totalPages > 1 && (
              <BasicPagination
                length={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}

            {/* Modal cho mobile */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black overscroll-auto bg-opacity-50 flex justify-center items-center md:hidden">
                <div className="bg-white rounded-lg relative w-[95%] max-h-[90vh] overflow-y-auto">
                  <div
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-xl font-bold"
                  >
                    <IoClose size={32} />
                  </div>
                  <div className="mt-4">
                    <PostDetails id={selectedPost} />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  )
}

export default Main
