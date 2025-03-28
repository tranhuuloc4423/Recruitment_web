import React, { useEffect, useState, useRef } from 'react';

const MultiDropdownSearch = ({
  items = [],         // Danh sách các mục để chọn, mặc định là mảng rỗng
  selectedItems = [], // Danh sách các mục đã chọn, mặc định là mảng rỗng
  setSelectedItems,   // Hàm để cập nhật danh sách đã chọn
  required = false,   // Có yêu cầu bắt buộc hay không
  label = '',         // Nhãn của component
  placeholder = '',   // Văn bản placeholder cho input
}) => {
  const [search, setSearch] = useState('');
  const [focus, setFocus] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  const dropdownRef = useRef(null);

  // Cập nhật danh sách các mục đã lọc
  useEffect(() => {
    const filtered = items.filter(
      (item) =>
        !selectedItems.some((selected) => selected.id === item.id) &&
        item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [items, selectedItems, search]);

  // Xử lý thay đổi từ khóa tìm kiếm
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Xử lý chọn một mục
  const handleSelectItem = (item) => {
    setSelectedItems([...selectedItems, item]);
    setSearch('');
    setFocus(false); // Đóng dropdown sau khi chọn một mục
  };

  // Xử lý xóa một mục
  const handleRemoveItem = (itemToRemove) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== itemToRemove.id));
  };

  // Đóng dropdown khi nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFocus(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="w-full gap-4 relative" ref={dropdownRef}>
      <div className="flex flex-col">
        {/* Nhãn và dấu yêu cầu */}
        <div className="flex flex-row gap-1 items-center">
          <span>{label}</span>
          {required && <span className="text-red-500">*</span>}
        </div>

        {/* Khu vực chứa thẻ và input */}
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2 border-2 px-4 py-2 rounded-md">
            {/* Hiển thị các thẻ đã chọn */}
            {selectedItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-200 px-2 py-1 rounded flex items-center"
              >
                <span>{item.name}</span>
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="ml-2 text-red-500"
                >
                  x
                </button>
              </div>
            ))}
            {/* Ô input để tìm kiếm */}
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              onFocus={() => setFocus(true)}
              placeholder={placeholder}
              className="outline-none border-none flex-1"
            />
          </div>

          {/* Dropdown hiển thị các mục có thể chọn */}
          {focus && (
            <div className="absolute left-0 w-full mt-1 bg-white rounded shadow-lg overflow-y-auto z-10 max-h-40">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSelectItem(item)}
                  >
                    {item.name}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">Không có lựa chọn</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiDropdownSearch;