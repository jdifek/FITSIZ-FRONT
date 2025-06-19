import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api, { type masksType } from "../api/api";
import { useUserContext } from "../../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

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
        .getUser(user.telegramId.toString())
        .then((fetchedUser) => {
          setPhone(fetchedUser.phone || "");
          setEmail(fetchedUser.email || "");
          setSelectedMaskId(fetchedUser.maskId || null);
        })
        .catch((error) => {
          console.error("Ошибка получения пользователя:", error);
        })
        .then(() => {
          api
            .getMasks()
            .then((data) => {
              setMasks(data);
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
        .updateProfile(user.telegramId.toString(), phone, email, selectedMaskId)
        .then(() => api.getUser(user.telegramId.toString()))
        .then((updatedUser) => {
          setUser(updatedUser);
          navigate("/welcome");
        })
        .catch((error) => console.error("Ошибка обновления профиля:", error))
        .finally(() => setLoading(false));
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600 mt-20">Загрузка...</div>;
  }

  const currentMaskName = masks.find((m) => m.id === selectedMaskId)?.name;

  return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 space-y-6 border border-gray-200">
        {/* Аватар */}
        <div className="flex flex-col items-center space-y-3">
          <div className="rounded-full bg-green-100 p-4 shadow-inner">
            <FaUserCircle className="text-green-600" size={64} />
          </div>
          <h2 className="text-2xl font-bold text-green-700">Профиль</h2>
          <p className="text-sm text-gray-500">
            {user?.first_name || "Пользователь"}, настройте данные ниже
          </p>
        </div>

        {/* Поля */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">Телефон</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7..."
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">Маска</label>
            <select
              value={selectedMaskId || ""}
              onChange={(e) => setSelectedMaskId(Number(e.target.value) || null)}
              disabled={masks.length === 0}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="">Выберите маску</option>
              {masks.map((mask) => (
                <option key={mask.id} value={mask.id}>
                  {mask.name}
                </option>
              ))}
            </select>
            {selectedMaskId && (
              <p className="text-xs text-green-600 mt-1">
                Текущая маска: <strong>{currentMaskName}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={handleUpdate}
            disabled={!selectedMaskId || !user?.telegramId}
            className=" text-white px-6 py-3 rounded-xl shadow-md hover:scale-105 transition disabled:opacity-50"
          >
            Обновить
          </button>
          <button
            onClick={() => navigate("/welcome")}
            className=" text-white px-6 py-3 rounded-xl hover:bg-gray-300 transition"
          >
            Назад
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
