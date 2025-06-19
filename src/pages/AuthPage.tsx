import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useUserContext } from "../../context/AuthContext";

const AuthPage: React.FC = () => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      tg.ready();
      if (tg.isVersionAtLeast("8.0")) {
        tg.requestFullscreen();
        tg.setHeaderColor("#000000");
      } else {
        tg.expand();
        console.log(
          "Bot API ниже 8.0, используется expand(). Текущая версия Telegram:",
          tg.version
        );
      }

      const initData = tg.initDataUnsafe;
      console.log("Telegram initData:", JSON.stringify(initData, null, 2));
      if (initData?.user) {
        console.log("User data extracted:", initData.user);
        api
          .registerUser(initData.user.id.toString(), initData.user.first_name)
          .then((registeredUser) => {
            setUser(registeredUser);
            navigate("/welcome");
          })
          .catch((error) => {
            console.error("Login error:", error.message);
          });
      } else {
        console.warn("User data not available in initData");
      }
    } else {
      console.warn("Telegram.WebApp is not available. Environment:", {
        windowLocation: window.location.href,
        userAgent: navigator.userAgent,
      });

      // Используем заглушку для тестов вне Telegram
      const mockUser = { id: "569166369", first_name: "Денис" };
      console.log("Using mock user for non-Telegram environment:", mockUser);
      api
        .registerUser(mockUser.id, mockUser.first_name)
        .then((registeredUser) => {
          setUser(registeredUser);
          navigate("/welcome");
        })
        .catch((error) => {
          console.error("Login error with mock data:", error.message);
        });
    }
  }, [setUser, navigate]);

  return (
    <div className="text-center space-y-6">
      <p className="text-gray-600">Пожалуйста, авторизуйтесь через Telegram</p>
      <button
        className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
        disabled
      >
        Войти
      </button>
    </div>
  );
};

export default AuthPage;
