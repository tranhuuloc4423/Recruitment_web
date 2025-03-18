import React, { useEffect, useState } from 'react';
import { getSkills } from '../redux/api/app';
import { useDispatch } from 'react-redux';
import { MdEdit } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

const SkillManage = () => {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // Giả định có bộ lọc
  const dispatch = useDispatch();

  // Lấy dữ liệu từ API
  const getData = async () => {
    const data = await getSkills(dispatch);
    setSkills(data || []); // Đảm bảo data là mảng
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  // Xử lý tìm kiếm
  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(search.toLowerCase())
  );

  // Giả lập các hàm CRUD
  const handleAdd = () => {
    const newSkill = { id: Date.now(), name: 'New Skill', value: 0 }; // Giả lập
    setSkills([...skills, newSkill]);
  };

  const handleEdit = (id) => {
    const updatedName = prompt('Nhập tên mới:');
    const updatedValue = prompt('Nhập giá trị mới:');
    if (updatedName && updatedValue) {
      setSkills(
        skills.map((skill) =>
          skill.id === id ? { ...skill, name: updatedName, value: updatedValue } : skill
        )
      );
    }
  };

  const handleDelete = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-4">
          {/* Tìm kiếm */}
          <input
            type="text"
            placeholder="Tìm kiếm kỹ năng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Nút Thêm */}
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Thêm kỹ năng
        </button>
      </div>

      {/* Bảng danh sách kỹ năng */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tên</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Giá trị</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredSkills.length > 0 ? (
              filteredSkills.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800">{item.name}</td>
                  <td className="px-6 py-4 text-gray-800">{item.value}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="px-3 py-1 text-blue-600 hover:text-blue-800 mr-2"
                    >
                      <MdEdit size={24}/>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 text-red-600 hover:text-red-800"
                    >
                      <TiDelete size={24}/>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  Không có kỹ năng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkillManage;