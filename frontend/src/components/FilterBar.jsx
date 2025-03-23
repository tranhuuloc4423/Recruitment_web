import React from 'react';

const FilterBar = ({ filters, setFilters }) => {
  return (
    <div className="flex space-x-4 p-4 bg-white shadow-md rounded-lg">
      {/* Dropdown Cấp bậc */}
      <div className="flex flex-col">
        <label className="font-medium mb-1">Cấp bậc</label>
        <select
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={filters.level}
          onChange={(e) => setFilters({ ...filters, level: e.target.value })}
        >
          <option value="">Tất cả</option>
          <option value="Intern">Intern</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      {/* Dropdown Hình thức làm việc */}
      <div className="flex flex-col">
        <label className="font-medium mb-1">Hình thức làm việc</label>
        <select
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={filters.workType}
          onChange={(e) => setFilters({ ...filters, workType: e.target.value })}
        >
          <option value="">Tất cả</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Remote">Remote</option>
        </select>
      </div>

      {/* Dropdown Mức lương */}
      <div className="flex flex-col">
        <label className="font-medium mb-1">Mức lương</label>
        <select
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={filters.salary}
          onChange={(e) => setFilters({ ...filters, salary: e.target.value })}
        >
          <option value="">Tất cả</option>
          <option value="10-15">10-15 triệu</option>
          <option value="15-20">15-20 triệu</option>
          <option value="20+">20+ triệu</option>
        </select>
      </div>

      {/* Dropdown Lĩnh vực */}
      <div className="flex flex-col">
        <label className="font-medium mb-1">Lĩnh vực</label>
        <select
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={filters.field}
          onChange={(e) => setFilters({ ...filters, field: e.target.value })}
        >
          <option value="">Tất cả</option>
          <option value="IT">IT</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
        </select>
      </div>

      {/* Nút xóa bộ lọc */}
      <button
        className="p-2 text-blue-500 hover:text-blue-700"
        onClick={() => setFilters({ level: '', workType: '', salary: '', field: '' })}
      >
        Xóa bộ lọc
      </button>
    </div>
  );
};

export default FilterBar;