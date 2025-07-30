/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useUserContext } from "../../context/AuthContext";

const AuthPage: React.FC = () => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
  
    const handleLogin = (user: any) => {
      api
        .registerUser(user.id.toString(), user.first_name || user.username || "User")
        .then((registeredUser) => {
          setUser(registeredUser);
          navigate("/welcome");
        })
        .catch((error) => {
          console.error("Login error:", error.message);
        });
    };
  
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
        handleLogin(initData.user);
      } else {
        console.warn("User data not available in initData");
      }
    } else {
      console.warn("Telegram.WebApp is not available. Environment:", {
        windowLocation: window.location.href,
        userAgent: navigator.userAgent,
      });
  
      // Попробуем получить данные из tgWebAppData в URL (например, при открытии в браузере)
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace("#", ""));
      const tgWebAppData = params.get("tgWebAppData");
  
      if (tgWebAppData) {
        const decodedData = decodeURIComponent(tgWebAppData);
        const dataParams = new URLSearchParams(decodedData);
        const userParam = dataParams.get("user");
        const user = userParam
          ? JSON.parse(decodeURIComponent(userParam))
          : null;
  
        if (user) {
          console.log("Extracted user data from tgWebAppData:", user);
          handleLogin(user);
        } else {
          console.warn("No user data in tgWebAppData");
        }
      } else {
        // Хардкод для тестов в браузере
        console.log("tgWebAppData not found in URL, using hardcoded data");
        const hardcodedUser = {
          id: "5969166369",
          first_name: "Денис",
          username: "denis_nickname",
          photo_url:
            "https://t.me/i/userpic/320/ArOpXH92rj_EpmqJ6uB_-vEugbCinOd3VU8tLlkf5DSxI8r40DuBCgyZH4VxImpQ.svg",
        };
  
        handleLogin(hardcodedUser);
      }
    }
  }, [setUser, navigate]);
  
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default AuthPage;
