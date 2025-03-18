import React, { useEffect, useState } from 'react';
import logo from '../assets/imgs/Logo_Dai_Hoc_Lac_Hong.png';
import Account from './Account';
import Button from './Button';
import { useNavigate, Link } from 'react-router-dom';
import Noti from './Noti';
import nav from '../utils/nav';
import { useSelector } from 'react-redux';
import { LuMenu } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const { currentRole } = useSelector((state) => state.app);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {}, [currentUser]);

  return (
    <>
      {/* Header chính */}
      <div className="w-full flex justify-between items-center bg-primary px-8 h-[80px]">
        {/* Logo: luôn hiển thị */}
        <div className="flex items-center h-full">
          <img src={logo} alt="Logo Lac Hong" className="w-[100px]" />
        </div>
        {/* Navigation links: chỉ hiển thị trên desktop */}
        <div className="hidden md:flex text-white h-full">
          {currentUser?._id && currentRole ? (
            nav
              .find((nav) => nav.name === currentUser?.role)
              ?.nav?.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="px-4 h-full flex items-center cursor-pointer hover:bg-[rgba(0,0,0,0.3)]"
                >
                  {item.name}
                </Link>
              ))
          ) : (
            <></>
          )}
        </div>
        {/* Account section: chỉ hiển thị trên desktop */}
        <div className="hidden md:flex gap-4 items-center">
          {currentUser?._id ? (
            <>
              <Noti />
              <Account />
            </>
          ) : (
            <>
              <Button
                label={'Đăng nhập'}
                className="border border-white"
                onClick={() => navigate('/signin')}
              />
              <Button
                label={'Đăng ký'}
                className="border border-white"
                onClick={() => navigate('/signup')}
              />
            </>
          )}
        </div>
        {/* Burger menu: chỉ hiển thị trên mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(true)} className="text-white">
            <LuMenu />
          </button>
        </div>
      </div>

      {/* Overlay: làm mờ nền khi menu mở */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        } z-40`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Menu di động: trượt từ trái */}
      <div
        className={`fixed top-0 left-0 w-2/3 h-full bg-primary z-50 flex flex-col transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMenuOpen(false)} className="text-white">
            <IoClose />
          </button>
        </div>
        <div className="flex flex-col gap-4 p-4 text-white">
          {/* Navigation links trong menu di động */}
          {currentUser?._id && currentRole ? (
            nav
              .find((nav) => nav.name === currentUser?.role)
              ?.nav?.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))
          ) : (
            <></>
          )}
          {/* Account section trong menu di động */}
          {currentUser?._id ? (
            <>
              <div className="py-2">
                <Noti />
              </div>
              <div className="py-2">
                <Account />
              </div>
            </>
          ) : (
            <>
              <Button
                label={'Đăng nhập'}
                className="border border-white w-full"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/signin');
                }}
              />
              <Button
                label={'Đăng ký'}
                className="border border-white w-full"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/signup');
                }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;