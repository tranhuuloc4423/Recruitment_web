import React, { useEffect, useState } from 'react';
import { createSkill, updateSkill, deleteSkill, getSkills } from '../redux/api/app';
import { useDispatch } from 'react-redux';
import { MdEdit } from 'react-icons/md';
import { IoClose } from 'react-icons/io5'
import Swal from 'sweetalert2';
import { Button } from '../components';

const SkillManage = () => {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  // Lấy dữ liệu từ API
  const getData = async () => {
    const data = await getSkills(dispatch);
    setSkills(data); // Đảm bảo data là mảng
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  // Xử lý tìm kiếm
  const filteredSkills = skills?.filter((skill) =>
    skill.name.toLowerCase().includes(search.toLowerCase())
  );

  // Thêm kỹ năng mới
  const handleAdd = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Thêm kỹ năng mới',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Tên kỹ năng">',
      focusConfirm: false,
      preConfirm: () => {
        return {
          name: document.getElementById('swal-input1').value,
        };
      },
    });

    if (formValues && formValues.name) {
      const createdSkill = await createSkill(formValues.name);
      if (createdSkill) {
        setSkills([...skills, createdSkill]);
        Swal.fire('Thành công!', 'Kỹ năng đã được thêm.', 'success');
      }
    }
  };

  // Sửa kỹ năng
  const handleEdit = async (skill) => {
    const { value: formValues } = await Swal.fire({
      title: 'Sửa kỹ năng',
      html: `
        <input id="swal-input1" class="swal2-input" value="${skill.name}" placeholder="Tên kỹ năng">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          name: document.getElementById('swal-input1').value,
        };
      },
    });

    if (formValues && formValues.name) {
      const result = await updateSkill(formValues.name, skill._id); // Gọi API sửa với name và _id
      if (result) {
        setSkills(skills.map((s) => (s._id === skill._id ? { ...s, name: result.name, value: result.value } : s)));
        Swal.fire('Thành công!', 'Kỹ năng đã được cập nhật.', 'success');
      }
    }
  };

  // Xóa kỹ năng
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc không?',
      text: 'Bạn muốn xóa kỹ năng này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, xóa nó!',
      cancelButtonText: 'Hủy',
    });

    if (result.isConfirmed) {
      const deleted = await deleteSkill(id, dispatch); // Gọi API xóa
      if (deleted) {
        setSkills(skills.filter((skill) => skill._id !== id));
        Swal.fire('Đã xóa!', 'Kỹ năng đã được xóa thành công.', 'success');
      }
    }
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
            className="px-4 py-2 border outline-second"
          />
        </div>
        <Button label={"Thêm kỹ năng"} onClick={handleAdd} />
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
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-primary"
                    >
                      <MdEdit size={24} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <IoClose size={24} />
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