import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";
import { FaUser, FaVideo, FaMask, FaList } from "react-icons/fa";

const WelcomePage: React.FC = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const buttons = [
    {
      label: "Моя маска",
      icon: <FaMask className="text-2xl text-green-600" />,
      path: "/mask",
      color: "from-green-400 to-green-600",
    },
    {
      label: "Каталог",
      icon: <FaList className="text-2xl text-green-600" />,
      path: "/catalog",
      color: "from-blue-400 to-blue-600",
    },
    {
      label: "Видео",
      icon: <FaVideo className="text-2xl text-green-600" />,
      path: "/video",
      color: "from-purple-400 to-purple-600",
    },
    {
      label: "Профиль",
      icon: <FaUser className="text-2xl text-green-600" />,
      path: "/profile",
      color: "from-yellow-400 to-yellow-600",
    },
  ];

  return (
    <div className="px-4 py-10 max-w-md mx-auto">
      {/* Приветствие */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-green-600">Привет, {user?.first_name || "Гость"}!</h2>
        <p className="mt-2 text-gray-500 text-sm">
          Добро пожаловать в <strong className="text-green-700">FITSIZ</strong> — выбери, куда пойти!
        </p>
      </div>

      {/* Секция кнопок */}
      <div className="grid grid-cols-1 gap-5">
        {buttons.map(({ label, icon, path, color }) => (
          <div
            key={label}
            onClick={() => navigate(path)}
            className={`flex items-center gap-4 p-4 rounded-2xl shadow-lg cursor-pointer bg-gradient-to-br ${color} transition-transform hover:scale-[1.02] active:scale-[0.98]`}
          >
            <div className="bg-white rounded-full p-3 shadow-inner">
              {icon}
            </div>
            <div className="text-white font-semibold text-lg">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomePage;
