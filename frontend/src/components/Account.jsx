import React, { useEffect, useState } from 'react';
import defaultAvatar from '../assets/imgs/blank-profile-picture-973460_960_720.png';
import { IoIosArrowDown } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../redux/slices/authSlice';
import Swal from 'sweetalert2';

const Account = () => {
  const [active, setActive] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const { currentRole } = useSelector((state) => state.app);
  const [avatar, setAvatar] = useState(defaultAvatar);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    Swal.fire({
      title: 'Đăng xuất',
      text: `Bạn có chắc muốn đăng xuất`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Quay lại',
      confirmButtonText: 'Đăng xuất',
    }).then(async (result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('currentUser');
        navigate('signin');
        dispatch(setCurrentUser(null));
      }
    });
  };

  useEffect(() => {
    if (currentUser) {
      let userImage = defaultAvatar;
      userImage = currentRole?.basic_info?.image?.url || defaultAvatar;
      setAvatar(userImage);
    }
  }, [currentUser, currentRole]);

  return (
    <div
      className="md:border md:border-white rounded p-2 md:relative cursor-pointer"
      onClick={() => setActive(!active)}
    >
      {/* Header: Avatar, Name, Arrow */}
      <div className="flex items-center gap-2 w-full justify-between">
        <div className='flex items-center gap-2'>
        <img
          src={avatar}
          alt="avatar"
          className="rounded-full w-10 h-10 object-cover"
        />
        <span className="text-white text-xl md:text-base select-none whitespace-nowrap overflow-hidden text-ellipsis truncate md:max-w-[150px]">
          {currentRole?.basic_info?.name}
        </span>
        </div>
        <IoIosArrowDown size={24} color="white" />
      </div>

      {/* Dropdown */}
      <div
        className={`${
          active ? 'block mt-2.5 md:absolute md:top-[100%] md:left-0' : 'hidden'
        } w-full  md:bg-white bg-gray-100 text-black-100 shadow-md flex flex-col rounded md:transition-transform`}
        onClick={(e) => e.stopPropagation()} // Ngăn click vào dropdown toggle lại active
      >
        {currentUser?.role && (
          <>
            <Link to={'/settings'} className="flex text-xl md:text-base items-center gap-2 px-4 py-2">
              <IoSettingsOutline />
              Cài đặt
            </Link>
            <div
              className="flex items-center text-xl md:text-base gap-2 px-4 py-2"
              onClick={handleLogout}
            >
              <LuLogOut />
              Đăng xuất
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Account;