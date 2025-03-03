import React, { useEffect, useRef, useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { PostDetails, Button, Post } from '../components';
import { getAllPostConfirmed } from '../redux/api/post';

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  const { currentRole } = useSelector((state) => state.app);

  // Lấy danh sách bài post
  const fetchPosts = async () => {
    try {
      const data = await getAllPostConfirmed();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Tính điểm phù hợp (matchScore) dựa trên currentRole
  const calculateMatchScore = (post) => {
    console.log(currentRole.target)
    console.log(post)
    if (!currentRole?.target) return 0;
    const { skills, target_money, types, address, wforms } = currentRole.target;
    let score = 0;

    // Kỹ năng (30% trọng số)
    if (skills?.length > 0) {
      const postSkills = post.skills.map((s) => s.value);
      const matchedSkills = postSkills.filter((s) => skills.some((skill) => skill.value === s));
      score += (matchedSkills.length / skills.length) * 30;
    }
    
    // Địa chỉ (25% trọng số)
    if(address) {
      if (post?.location?.address[0]?.province?.code === address.code) {
        score += 25;
      }
    }

    // Lương (25% trọng số)
    if (target_money) {
      const salaryInMillions = post.salary / 1000000;
      if (salaryInMillions >= target_money.min_money && salaryInMillions <= target_money.max_money) {
        score += 25;
      }
    }

    if (types?.length > 0) {
      const postTypes = post.types.map((s) => s.value);
      const matchedTypes = postTypes.filter((s) => types.some((type) => type.value === s));
      score += (matchedTypes.length / types.length) * 10;
    }

    if (wforms?.length > 0) {
      const postWforms = post.wforms.map((s) => s.value);
      const matchedWforms = postWforms.filter((s) => wforms.some((wform) => wform.value === s));
      score += (matchedWforms.length / wforms.length) * 10;
    }

    return score;
  };

  // Sắp xếp bài post theo matchScore và views
  const sortPosts = (postsToSort) => {
    return [...postsToSort].sort((a, b) => {
      const scoreA = calculateMatchScore(a);
      const scoreB = calculateMatchScore(b);

      // Debug để kiểm tra giá trị
      // console.log(`Post ${a._id}: matchScore=${scoreA}, views=${a.views}`);
      // console.log(`Post ${b._id}: matchScore=${scoreB}, views=${b.views}`);

      // Ưu tiên matchScore (giảm dần)
      if (scoreB !== scoreA) return scoreB - scoreA;

      // Nếu matchScore bằng nhau, sắp xếp theo views (giảm dần)
      return b.views - a.views;
    });
  };

  // Lọc bài post theo từ khóa tìm kiếm
  const filterPostsBySearch = (searchTerm) => {
    if (!searchTerm) return sortPosts(posts);
    const term = searchTerm.toLowerCase();
    const filtered = posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(term);
      const skillsMatch = post.skills?.some((skill) => skill.name?.toLowerCase().includes(term));
      const locationMatch = post.location?.address?.[0]?.province?.name?.toLowerCase().includes(term);
      return titleMatch || skillsMatch || locationMatch;
    });
    return sortPosts(filtered);
  };

  // Lọc bài post theo bộ lọc (filterFrame)
  const filterPostsByFrame = () => {
    const filter = JSON.parse(localStorage.getItem('filterFrame')) || {};
    const { skills, target_money, address } = filter;

    const filtered = posts.filter((post) => {
      const addressMatch = address?.code
        ? post?.location?.address[0]?.province?.code === address.code
        : true;
      const skillsMatch = skills?.length > 0
        ? skills.every((skill) => post.skills.some((s) => s.value === skill.value))
        : true;
      const targetMoneyMatch = target_money
        ? post.salary / 1000000 >= target_money.min_money && post.salary / 1000000 <= target_money.max_money
        : true;

      return addressMatch && skillsMatch && targetMoneyMatch;
    });
    return sortPosts(filtered);
  };

  // Xử lý tìm kiếm
  const handleSearch = () => {
    const sortedFiltered = filterPostsBySearch(search);
    setFilteredPosts(sortedFiltered);
    if (search.trim()) {
      saveToHistory(search.trim());
      setSearch('');
    }
    setIsFocused(false);
    searchRef.current.blur();
  };

  // Lưu lịch sử tìm kiếm
  const saveToHistory = (term) => {
    const updatedHistory = [...new Set([term, ...history])].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  // Xử lý phím tắt
  const handleKeySearch = (e) => {
    if (e.key === 'Tab' && filteredSuggestions.length > 0) {
      e.preventDefault();
      setSearch(filteredSuggestions[0]);
      setIsFocused(false);
    }
    if (e.key === 'Enter') handleSearch();
  };

  // Xóa gợi ý lịch sử
  const handleRemoveSuggestion = (index) => {
    const updatedSuggestions = history.filter((_, i) => i !== index);
    setHistory(updatedSuggestions);
    localStorage.setItem('searchHistory', JSON.stringify(updatedSuggestions));
  };

  // Tối ưu filteredPosts bằng useMemo
  const optimizedFilteredPosts = useMemo(() => {
    if (posts.length === 0) return [];
    return isFilter ? filterPostsByFrame() : filterPostsBySearch(search);
  }, [posts, search, isFilter, currentRole]);

  // Khởi tạo dữ liệu
  useEffect(() => {
    fetchPosts();
    const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistory(storedHistory);
  }, []);

  // Cập nhật filteredPosts và selectedPost khi dữ liệu thay đổi
  useEffect(() => {
    if (posts.length > 0 && currentRole) {
      const sortedPosts = sortPosts(posts);
      setFilteredPosts(sortedPosts);
      console.log(sortedPosts)
      setSelectedPost(sortedPosts[0]?._id || null);
    }
  }, [posts, currentRole]);

  // Cập nhật filteredPosts khi search hoặc filter thay đổi
  useEffect(() => {
    if (posts.length > 0) {
      setFilteredPosts(optimizedFilteredPosts);
      setSelectedPost(optimizedFilteredPosts[0]?._id || null);
    }
  }, [optimizedFilteredPosts]);

  // Cập nhật gợi ý tìm kiếm
  useEffect(() => {
    setFilteredSuggestions(history.filter((item) => item.toLowerCase().includes(search.toLowerCase())));
  }, [search, history]);

  return (
    <div className="flex flex-col gap-4 justify-center items-center mx-auto">
      <div className="w-2/3 flex flex-col gap-2">
        <div className="flex flex-row gap-4 w-full items-center">
          <div className="w-full relative">
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm theo từ khóa"
              className="w-full focus:outline-none focus:border-blue-500 px-4 py-2 rounded"
              onKeyDown={handleKeySearch}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            />
            {isFocused && filteredSuggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white shadow-md rounded mt-2 z-50">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                  >
                    <span onClick={() => setSearch(suggestion)} className="flex-1">
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
            label="Tìm kiếm"
            onClick={handleSearch}
            icon={<FiSearch size={24} color="white" />}
            iconPosition="left"
            className="px-8"
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
          <span className="heading-3">
            <span className="text-primary font-semibold text-3xl">{filteredPosts.length}</span> công việc đã được tìm thấy
          </span>
        </div>
        <div className="flex flex-row gap-4">
          <div className="w-1/3 flex flex-col gap-2 h-[1000px] overflow-y-auto">
            {filteredPosts.map((post) => (
              <div
                key={post._id}
                onClick={() => setSelectedPost(post._id)}
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
  );
};

export default Main;