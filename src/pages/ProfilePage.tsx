import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { type MasksType } from "../api/api";
import { useUserContext } from "../../context/AuthContext";

const ProfilePage: React.FC = () => {
  const { user, setUser } = useUserContext();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [masks, setMasks] = useState<MasksType[]>([]);
  const [userMasks, setUserMasks] = useState<MasksType[]>([]);
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
            .then((data: MasksType[]) => {
              setMasks(data);
              const userMask = data.filter((mask) => mask.id === user.maskId);
              setUserMasks(userMask);

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
    if (user && user.telegramId) {
      setLoading(true);
      api
        .updateProfile(user.telegramId, phone, email, selectedMaskId)
        .then(() => api.getUser(user.telegramId.toString()))
        .then((updatedUser) => {
          setUser(updatedUser);
          navigate("/welcome");
        })
        .catch((error) => console.error("Ошибка обновления профиля:", error))
        .finally(() => setLoading(false));
    }
  };
 

  const currentMaskName = masks.find((m) => m.id === selectedMaskId)?.name;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-full">
      {/* Header */}

      {/* Content */}
      {/* Profile Avatar and Info */}
      <div className="flex flex-col items-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-6">Личный кабинет сварщика</h3>
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center mb-4 shadow-lg">
          {/* Avatar illustration */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              className="text-orange-800"
            >
              <circle cx="24" cy="18" r="8" fill="currentColor" opacity="0.8" />
              <path
                d="M12 36c0-6.627 5.373-12 12-12s12 5.373 12 12"
                fill="currentColor"
                opacity="0.8"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          {user?.first_name || "User"}
        </h2>
        <p className="text-green-500 text-sm font-medium">
         Обновите детали о вас
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6 ">
        {/* Phone Number */}
        <div>
          <label className="block text-gray-900 font-medium mb-3 text-base">
            Номер Телефона{" "}
          </label>
          <div className="bg-green-50 rounded-xl p-4">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-transparent text-green-600 placeholder-green-400 text-base focus:outline-none"
              placeholder="+7..."
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-gray-900 font-medium mb-3 text-base">
            Email Aдрес
          </label>
          <div className="bg-green-50 rounded-xl p-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-green-600 placeholder-green-400 text-base focus:outline-none"
              placeholder="example@mail.com"
            />
          </div>
        </div>

        {/* Mask Name */}
        <div>
          <label className="block text-gray-900 font-medium mb-3 text-base">
            Моя маска
          </label>
          <div className="bg-green-50 rounded-xl p-4">
            <select
              value={selectedMaskId || ""}
              onChange={(e) =>
                setSelectedMaskId(Number(e.target.value) || null)
              }
              disabled={masks.length === 0}
              className="w-full bg-transparent text-green-600 text-base focus:outline-none appearance-none"
            >
              <option value="">Выберите маску</option>
              {masks.map((mask) => (
                <option key={mask.id} value={mask.id}>
                  {mask.name}
                </option>
              ))}
            </select>
          </div>
          {selectedMaskId && currentMaskName && (
            <p className="text-center text-green-500 text-sm mt-3 font-medium">
              Current mask: {currentMaskName}
            </p>
          )}
        </div>
        <div className="mt-6 space-y-4">
  <a href="/video/настройка" className="block w-full text-center py-2 bg-blue-500 text-white rounded-lg">Как настроить маску</a>
  <button
    className="w-full py-2 bg-gray-800 text-white rounded-lg"
    onClick={() => {
      if (confirm("Вы переходите на официального чат-бота FITSIZ, который поможет Вам сделать первые шаги в сварке")) {
        window.location.href = "https://t.me/fitsiz_assistant_bot";
      }
    }}
  >
    Как начать варить?
  </button>
</div>
        <h2 className="text-2xl font-bold text-green-700 mb-6">Мои маски</h2>

        {userMasks.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 mb-8">
          {userMasks.map((mask) => (
            <div
              key={mask.id}
              className="bg-white border rounded-xl p-3 shadow-sm hover:shadow-md transition text-left"
              onClick={() => navigate(`/details/${mask.id}`)}
            >
              {mask.imageUrl ? (
                <img
                  src={mask.imageUrl}
                  alt={mask.name}
                  className="w-full h-28 object-cover rounded-lg mb-2"
                />
              ) : (
                <div className="w-full h-28 bg-gray-200 rounded-lg mb-2 flex items-center justify-center text-gray-400">
                  Нет изображения
                </div>
              )}
              <h4 className="text-sm font-medium text-gray-800">{mask.name}</h4>
              {mask.price && (
                <p className="text-sm text-gray-500">{mask.price}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Здесь пока нет масок</p>
      )}
      </div>

      {/* Buttons */}
      <div className="mt-12 space-y-4">
        <button
          onClick={handleUpdate}
          disabled={!user?.telegramId || loading}
          className="w-full !bg-green-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-green-600 transition-colors disabled:opacity-50"
        >
          {loading ? "Загрузка..." : "Update"}
        </button>
        <button
          onClick={() => navigate("/welcome")}
          className="w-full !bg-gray-200 text-white  py-4 rounded-xl font-semibold text-lg hover:bg-gray-300 transition-colors"
        >
          Назад
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
