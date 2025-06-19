import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";

type masksType = {
  id: number;
  name: string;
  imageUrl?: string;
  price?: string;
};

const mockMasks: masksType[] = [
  {
    id: 1,
    name: "Автоматическая маска ESAB Sentinel A60",
    imageUrl:
      "https://www.tuttosaldatura.it/3376-large_default/maschera-automatica-esab-sentinel-a60-0700600860.jpg",
    price: "₽7999",
  },
  {
    id: 2,
    name: "Фиксированная сварочная маска",
    imageUrl:
      "https://www.tuttosaldatura.it/3376-large_default/maschera-automatica-esab-sentinel-a60-0700600860.jpg",
    price: "₽4499",
  },
  {
    id: 3,
    name: "Пассивная маска с фильтром",
    imageUrl:
      "https://www.tuttosaldatura.it/3376-large_default/maschera-automatica-esab-sentinel-a60-0700600860.jpg",
    price: "₽2999",
  },
];

const MaskPage: React.FC = () => {
  const { user } = useUserContext();
  const [masks, setMasks] = useState<masksType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Вместо реального API ставим моковые данные
      setMasks(mockMasks);
    }
  }, [user]);

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Мои маски</h2>

      {masks.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 mb-8">
          {masks.map((mask) => (
            <div
              key={mask.id}
              className="bg-white border rounded-xl p-3 shadow-sm hover:shadow-md transition text-left"
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

      <div className="text-center mt-6">
        <button
          onClick={() => navigate("/welcome")}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Назад
        </button>
      </div>
    </div>
  );
};

export default MaskPage;
