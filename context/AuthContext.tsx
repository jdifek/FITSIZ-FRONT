/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "../src/api/api";

export interface User {
  id?: number;
  telegramId: string;
  firstName?: string;
  first_name?: string;
  phone?: string;
  email?: string;
  quiz?: boolean;
  maskId?: number | null;
  username?: string;
  photoUrl?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleLogin = (user: any) => {
      api
        .registerUser(user.id.toString(), user.first_name || user.username || "User")
        .then((registeredUser) => {
          setUser({
            ...registeredUser,
            first_name: registeredUser.firstName // для совместимости
          });
                  })
        .catch((error) => {
          console.error("User context login error:", error.message);
        });
    };

    const tg = window.Telegram?.WebApp;
    if (tg) {
      const initData = tg.initDataUnsafe;
      if (initData?.user) {
        console.log("Telegram WebApp user in context:", initData.user);
        handleLogin(initData.user);
        return;
      }
    }

    // Если не удалось получить пользователя через Telegram.WebApp
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
        console.log("User from tgWebAppData in URL:", user);
        handleLogin(user);
        return;
      }
    }

    // Фолбек: хардкод (использовать только для разработки!)
    const hardcodedUser = {
      id: "5969166369",
      first_name: "Денис",
      username: "denis_nickname",
      photo_url:
        "https://t.me/i/userpic/320/ArOpXH92rj_EpmqJ6uB_-vEugbCinOd3VU8tLlkf5DSxI8r40DuBCgyZH4VxImpQ.svg",
    };

    console.log("Using hardcoded user in context");
    handleLogin(hardcodedUser);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
