import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { PostDetails, Input, Button, Post, FilterFrame } from '../components'
import Recruiter from '../pages/Recruiter'
import { getAllPostConfirmed } from '../redux/api/post'
import Search from '../components/Search'
const Main = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [isFilter, setIsFilter] = useState(false)
  const [jobs, setJobs] = useState()

  const [selectedPost, setSelectedPost] = useState(posts[0]?._id)
  const [search, setSearch] = useState('')

  const getPosts = async () => {
    const data = await getAllPostConfirmed()
    setPosts(data)
    setFilteredPosts(data)
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
  }

  const handleFilter = () => {
    const { skills, target_money, types, address, wforms } = JSON.parse(
      localStorage.getItem('filterFrame')
    )
    const filtered = filteredPosts.filter((post) => {
      let addressMatch, skillsMatch, targetMoneyMatch, typesMatch, wformsMatch
      if (address) {
        addressMatch =
          post?.location?.address[0]?.province?.code === address?.code
      }

      if (skills) {
        skillsMatch = skills.every((skill) =>
          post?.skills.some((postSkill) => postSkill?.value === skill?.value)
        )
      }

      if (target_money) {
        targetMoneyMatch =
          post.salary >= target_money?.min_money &&
          post.salary <= target_money?.max_money
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
        addressMatch && skillsMatch && targetMoneyMatch
        // typesMatch ||
        // wformsMatch
      )
    })

    setFilteredPosts(filtered)
    setJobs(filtered.length)
    console.log(filteredPosts)
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

  return (
    <div className="flex flex-col gap-4 justify-center items-center mx-auto">
      <div className="w-2/3 flex flex-col gap-2">
        {/* Search */}
        <div className="flex flex-row gap-4 w-full items-center">
          {/* <Search /> */}
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm theo từ khoá"
          />
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
            <span className="text-primary font-semibold text-4xl">{jobs}</span>{' '}
            công việc đã được tìm thấy
          </span>
          <span>
            <FilterFrame isFilter={isFilter} setIsFilter={setIsFilter} />
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
