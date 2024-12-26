import React, { useEffect, useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import { PostDetails, Input, Button, Post, FilterFrame } from '../components'
import Recruiter from '../pages/Recruiter'
import { getAllPostConfirmed } from '../redux/api/post'
const Main = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [isFilter, setIsFilter] = useState(false)
  const [jobs, setJobs] = useState()

  const [selectedPost, setSelectedPost] = useState(posts[0]?._id)
  const [search, setSearch] = useState('')
  const [history, setHistory] = useState([])
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [isFocused, setIsFocused] = useState(false)
  const searchRef = useRef(null)

  const getPosts = async () => {
    const data = await getAllPostConfirmed()
    setPosts(data)
    setFilteredPosts(data)
  }

  const saveToHistory = (searchTerm) => {
    const updatedHistory = [...new Set([searchTerm, ...history])].slice(0, 10) // Giới hạn 10 lịch sử
    setHistory(updatedHistory)
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory))
  }

  const handleKeySearch = (e) => {
    if (e.key === 'Tab' && filteredSuggestions.length > 0) {
      e.preventDefault()
      setSearch(filteredSuggestions[0]) // Điền gợi ý đầu tiên
      setIsFocused(false)
    }
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleRemoveSuggestion = (index) => {
    setFilteredSuggestions((prevSuggestions) => {
      const updatedSuggestions = prevSuggestions.filter((_, i) => i !== index)
      localStorage.setItem('searchHistory', JSON.stringify(updatedSuggestions))
      return updatedSuggestions
    })
  }

  const handleSearch = () => {
    const searchTerm = search.toLowerCase()
    const filtered = posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(searchTerm)

      const skillsMatch = post.skills?.some((skill) =>
        skill.name?.toLowerCase().includes(searchTerm)
      )

      const locationMatch = post.location?.address?.[0]?.province?.name
        ?.toLowerCase()
        .includes(searchTerm)

      return titleMatch || skillsMatch || locationMatch
    })
    setFilteredPosts(filtered)
    setJobs(filtered.length)
    if (search.trim() !== '') {
      saveToHistory(search.trim())
      setSearch('') // Reset input
    }
    setIsFocused(false)
    searchRef.current.blur()
  }

  const handleFilter = () => {
    const { skills, target_money, types, address, wforms } = JSON.parse(
      localStorage.getItem('filterFrame')
    )
    const filtered = posts.filter((post) => {
      let addressMatch, skillsMatch, targetMoneyMatch, typesMatch, wformsMatch
      if (address) {
        addressMatch = address?.code
          ? post?.location?.address[0]?.province?.code === address?.code
          : true
      }

      if (skills) {
        skillsMatch =
          skills?.length > 0
            ? skills.every((skill) =>
                post?.skills.some(
                  (postSkill) => postSkill?.value === skill?.value
                )
              )
            : true
      }

      if (target_money) {
        targetMoneyMatch =
          target_money.length > 0
            ? post.salary % 1000000 >= target_money?.min_money &&
              post.salary % 1000000 <= target_money?.max_money
            : true
      }
      // if (types !== null) {
      //   typesMatch =
      //     types && types?.length > 0
      //       ? types?.every((type) =>
      //           post.types.some((postType) => postType?.name === type?.name)
      //         )
      //       : true
      // }

      // if (wforms !== null) {
      //   wformsMatch =
      //     wforms && wforms.length > 0
      //       ? wforms.every((wform) =>
      //           post.wforms.some((postWform) => postWform?.name === wform?.name)
      //         )
      //       : true
      // }

      // Return true only if all criteria match
      return (
        addressMatch && skillsMatch
        //  && targetMoneyMatch
        // typesMatch ||
        // wformsMatch
      )
    })

    setFilteredPosts(filtered)
    setJobs(filtered.length)
    console.log(filtered)
  }

  const handlePostClick = (id) => {
    setSelectedPost(id)
  }

  useEffect(() => {
    getPosts()
  }, [])

  useEffect(() => {
    if (isFilter) {
      handleFilter()
    }
  }, [isFilter])

  useEffect(() => {
    if (filteredPosts && filteredPosts.length > 0) {
      setSelectedPost(filteredPosts[0]._id)
      setJobs(filteredPosts.length)
    }
  }, [filteredPosts])

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem('searchHistory')) || []
    setHistory(storedHistory)
  }, [])

  useEffect(() => {
    setFilteredSuggestions(
      history.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, history])

  return (
    <div className="flex flex-col gap-4 justify-center items-center mx-auto">
      <div className="w-2/3 flex flex-col gap-2">
        {/* Search */}
        <div className="flex flex-row gap-4 w-full items-center">
          <div className="w-full relative">
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm theo từ khoá"
              className="w-full  focus:outline-none focus:border-blue-500 px-4 py-2 rounded"
              onKeyDown={(e) => handleKeySearch(e)}
              onFocus={() => {
                setIsFocused(true)
                console.log(filteredSuggestions)
              }}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            />

            {isFocused && filteredSuggestions && (
              <ul className="absolute top-[100%] left-0 right-0 bg-white shadow-md rounded mt-2 z-50">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                  >
                    <span
                      onClick={() => setSearch(suggestion)}
                      className="flex-1"
                    >
                      {suggestion}
                    </span>
                    <span onClick={() => handleRemoveSuggestion(index)}>
                      <IoClose size={24} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button
            label={'Tìm kiếm'}
            onClick={handleSearch}
            icon={<FiSearch size={24} color="white" />}
            iconPosition="left"
            className="px-8"
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 justify-between">
        <div className="flex flex-row justify-between items-center">
          <span className="heading-3">
            <span className="text-primary font-semibold text-3xl">{jobs}</span>{' '}
            công việc đã được tìm thấy
          </span>
        </div>
        <div className="flex flex-row gap-4 ">
          <div className="w-1/3 flex flex-col gap-2 h-[1000px] overflow-y-auto">
            {filteredPosts?.map((post, index) => (
              <div
                key={index}
                onClick={() => handlePostClick(post._id)}
                className="cursor-pointer"
              >
                <Post post={post} select={selectedPost} />
              </div>
            ))}
          </div>
          <div className="w-2/3">
            <PostDetails id={selectedPost} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
