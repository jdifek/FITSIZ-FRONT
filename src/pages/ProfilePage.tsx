import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api, { type masksType } from "../api/api";
import { useUserContext, type User } from "../../context/AuthContext";

const ProfilePage: React.FC = () => {
  const { user, setUser } = useUserContext();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [masks, setMasks] = useState<masksType[]>([]);
  const [selectedMaskId, setSelectedMaskId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.telegramId) {
      setLoading(true);
      api
        .getUser(parseInt(user.telegramId))
        .then((fetchedUser) => {
          setPhone(fetchedUser.phone || "");
          setEmail(fetchedUser.email || "");
          // Устанавливаем maskId сразу после получения пользователя
          setSelectedMaskId(fetchedUser.maskId || null);
        })
        .catch((error) => {
          console.error("Ошибка получения пользователя:", error);
        })
        .then(() => {
          api
            .getMasks()
            .then((data) => {
              console.log("Masks data:", data);
              setMasks(data);
              // Проверяем, что selectedMaskId соответствует одной из масок, если нет — сбрасываем
              if (
                selectedMaskId &&
                !data.some((mask) => mask.id === selectedMaskId)
              ) {
                setSelectedMaskId(null);
              }
            })
            .catch((error) => {
              console.error("Ошибка загрузки масок:", error);
            })
            .finally(() => setLoading(false));
        });
    } else {
      setLoading(false);
    }
  }, [user?.telegramId]);

  const handleUpdate = () => {
    if (user && user.telegramId && selectedMaskId) {
      setLoading(true);
      api
        .updateProfile(parseInt(user.telegramId), phone, email, selectedMaskId)
        .then(() => api.getUser(parseInt(user.telegramId))) // Получаем актуального пользователя
        .then((updatedUser) => {
          console.log("Updated user:", updatedUser);
          setUser(updatedUser as User); // Обновляем состояние пользователя
          navigate("/welcome");
        })
        .catch((error) => console.error("Ошибка обновления профиля:", error))
        .finally(() => setLoading(false));
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600">Загрузка...</div>;
  }

  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-bold text-green-600">Профиль</h2>
      <div className="space-y-4 max-w-md mx-auto">
        <input
          id="phone-input"
          type="text"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <input
          id="email-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <select
          id="mask-select"
          value={selectedMaskId || ""}
          onChange={(e) => setSelectedMaskId(Number(e.target.value) || null)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          disabled={masks.length === 0}
        >
          <option value="">Выберите маску</option>
          {masks.map((mask) => (
            <option key={mask.id} value={mask.id}>
              {mask.name}
            </option>
          ))}
        </select>
        <div className="flex gap-4 justify-center">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
            onClick={handleUpdate}
            disabled={!selectedMaskId || !user?.telegramId}
          >
            Обновить
          </button>
          <button
            className="px-6 py-3 bg-red-200 text-gray-700 rounded-lg hover:bg-red-300 transition duration-300 shadow-md"
            onClick={() => navigate("/welcome")}
          >
            Назад
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
