import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api, { type masksType } from "../api/api";
import { useUserContext } from "../../context/AuthContext";
import { FaUserCircle } from "react-icons/fa"; // иконка профиля

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
    return <div className="text-center text-gray-600">Загрузка...</div>;
  }

  const currentMaskName = masks.find((m) => m.id === selectedMaskId)?.name;

  return (
    <div className="text-center space-y-6 px-4 py-8">
      {/* Аватар и имя */}
      <div className="flex flex-col items-center space-y-2">
        <FaUserCircle className="text-green-600" size={72} />
        <h2 className="text-2xl font-bold text-green-600">Профиль</h2>
        <p className="text-sm text-gray-500">
          {user?.first_name || "Пользователь"}, редактируйте свои данные
        </p>
      </div>

      <div className="space-y-4 max-w-md mx-auto text-left">
        <div>
          <label className="text-sm font-medium text-gray-700">Телефон</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="+7..."
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="example@mail.com"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Маска</label>
          <select
            value={selectedMaskId || ""}
            onChange={(e) => setSelectedMaskId(Number(e.target.value) || null)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            disabled={masks.length === 0}
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

        <div className="flex gap-4 justify-center pt-4">
          <button
            onClick={handleUpdate}
            disabled={!selectedMaskId || !user?.telegramId}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 shadow-md disabled:opacity-50"
          >
            Обновить
          </button>
          <button
            onClick={() => navigate("/welcome")}
            className="px-6 py-3 bg-gray-300 text-white rounded-lg hover:bg-gray-400 transition duration-300 shadow-md"
          >
            Назад
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
