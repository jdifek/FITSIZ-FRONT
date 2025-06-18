import axios from "axios";
import type { User } from "../../context/AuthContext";

export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";
export const FILE_URL = import.meta.env.VITE_FILE;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Перехватчик для автоматического извлечения data
api.interceptors.response.use(
  (response) => {
    console.log("Response data:", response.data); // Для отладки
    return response.data;
  },
  (error) => Promise.reject(error)
);

export type videosType = {
  id: number;
  title: string;
};

export type masksType = {
  id: number;
  name: string;
};

export type profileType = {
  id: number;
  telegramId: string;
  firstName: string;
  phone: string;
  maskId: number;
  email: string;
  createdAt: string; // или Date, если вы будете парсить строку в объект Date
};

export default {
  registerUser: (telegramId: string, firstName: string): Promise<User> =>
    api
      .post<User>("/register", { telegramId, firstName })
      .then((res) => res.data),

  getUser: (telegramId: number): Promise<profileType> =>
    api.get<profileType>(`/user/${telegramId}`).then((res) => res.data),

  getMasks: (): Promise<masksType[]> =>
    api.get<masksType[]>("/masks").then(res => res.data),
    getCatalog: () => api.get("/catalog"),
  getVideos: (): Promise<videosType[]> =>
    api.get<videosType[]>("/videos").then((response) => response.data),
  updateProfile: (
    telegramId: number,
    phone: string,
    email: string,
    maskId: number
  ) => api.post("/profile", { telegramId, phone, email, maskId }),
};
