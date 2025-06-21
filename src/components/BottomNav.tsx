import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaVideo, FaMask, FaList } from "react-icons/fa";

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navItems = [
    { path: "/mask", icon: <FaMask />, label: "Маска" },
    { path: "/catalog", icon: <FaList />, label: "Каталог" },
    { path: "/video", icon: <FaVideo />, label: "Видео" },
    { path: "/profile", icon: <FaUser />, label: "Профиль" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white !bg-white border-t shadow-none flex justify-around py-2 pb-5 z-50">
      {navItems.map(({ path, icon }, i) => {
        const isActive = pathname === path;
        return (
          <button
            key={i}
            onClick={() => navigate(path)}
            className={`flex !bg-white flex-col items-center text-xs ${
              isActive ? "text-[#42BA1A]" : "text-black"
            }`}
          >
            <div className="text-2xl">{icon}</div>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
