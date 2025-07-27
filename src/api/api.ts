import axios from "axios";
import type { User } from "../../context/AuthContext";

// Типы
 type MasksType = {
  id: number;
  name: string;
  instructions?: string;
  imageUrl?: string;
  price?: string;
  weight?: string;
  viewArea?: string;
  sensors?: number;
  power?: string;
  shadeRange?: string;
  material?: string;
  description?: string;
  link?: string;
  installment?: string;
  size?: string;
  days?: string;
  features?: { id: number; name: string }[];
  reviews?: {
    id: number;
    userName: string;
    rating: number;
    comment?: string;
    createdAt: Date;
  }[];
  extraFields?: {
    id: number;
    key: string;
    value: string;
  }[];
};

 type VideoType = {
  id: number;
  title: string;
  url?: string;
  description?: string;
  duration?: string;
  thumbnailUrl?: string;
};

// API config
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Интерцептор для возврата response.data напрямую
api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

// Типизированный API
export default {
  registerUser: (telegramId: string, firstName: string): Promise<User> =>
    api.post("/register", { telegramId, firstName }),

  getUser: (telegramId: string): Promise<User> =>
    api.get(`/user/${telegramId}`),

  getMasks: (): Promise<MasksType[]> =>
    api.get("/masks"),

  getMaskDetails: (id: number): Promise<MasksType> =>
    api.get(`/masks/${id}`),

  getMaskInstructions: (id: number): Promise<string> =>
    api.get(`/masks/${id}/instructions`),

  getCatalog: (name: string): Promise<MasksType[]> =>
    api.get("/catalog", { params: { name } }),

  getVideos: (): Promise<VideoType[]> =>
    api.get("/videos"),

  updateProfile: (
    telegramId: string,
    phone: string,
    email: string,
    maskId: number | null
  ): Promise<User> =>
    api.post("/profile", { telegramId, phone, email, maskId }),
};

// Экспорт типов
export type { VideoType, MasksType };
