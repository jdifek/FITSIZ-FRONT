import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";

// Импорт иконок
import {
  FaUser,
  FaVideo,
  FaMask,
  FaList,
  FaInfoCircle,
  FaPhone,
} from "react-icons/fa";

const WelcomePage: React.FC = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const buttons = [
    {
      label: "Моя маска",
      icon: <FaMask className="mr-2" />,
      path: "/mask",
    },
    {
      label: "Каталог",
      icon: <FaList className="mr-2" />,
      path: "/catalog",
    },
    {
      label: "Видео",
      icon: <FaVideo className="mr-2" />,
      path: "/video",
    },
    {
      label: "Профиль",
      icon: <FaUser className="mr-2" />,
      path: "/profile",
    },
  ];

  return (
    <div className="">
      {/* Основной контент */}
      <div className="text-center mt-8">
        <p className="text-2xl font-bold text-green-600">
          Привет, {user?.first_name || "Гость"}!
        </p>

        <p className="mt-2 text-gray-600 text-sm">
          Добро пожаловать в наше приложение! Выберите нужный раздел ниже.
        </p>

        <div className="mt-6 space-y-2 flex flex-col items-center">
          {buttons.map(({ label, icon, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
