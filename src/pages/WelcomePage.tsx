import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";

const WelcomePage: React.FC = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-green-600">FITSIZ</h1>
      <p className="mt-4">Привет, {user?.first_name || "Гость"}!</p>
      <div className="mt-6 space-y-2 flex flex-col items-center">
        <button
          onClick={() => navigate("/mask")}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
        >
          Моя маска
        </button>
        <button
          onClick={() => navigate("/catalog")}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
        >
          Каталог
        </button>
        <button
          onClick={() => navigate("/video")}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
        >
          Видео
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
        >
          Профиль
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
