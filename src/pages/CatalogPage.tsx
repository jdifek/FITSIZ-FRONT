import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type ProductType = {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
};

const sharedImage = "https://www.tuttosaldatura.it/3376-large_default/maschera-automatica-esab-sentinel-a60-0700600860.jpg";

const popularProducts: ProductType[] = [
  {
    id: 1,
    name: "Автоматическая маска",
    price: "₽7999",
    imageUrl: sharedImage,
  },
  {
    id: 2,
    name: "Фиксированная маска",
    price: "₽4499",
    imageUrl: sharedImage,
  },
  {
    id: 3,
    name: "Пассивная маска",
    price: "₽2999",
    imageUrl: sharedImage,
  },
];

const recommendedProducts: ProductType[] = [
  {
    id: 4,
    name: "Перчатки",
    price: "₽1499",
    imageUrl: sharedImage,
  },
  {
    id: 5,
    name: "Куртка сварщика",
    price: "₽2999",
    imageUrl: sharedImage,
  },
  {
    id: 6,
    name: "Очки защитные",
    price: "₽799",
    imageUrl: sharedImage,
  },
];

const CatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState<string | null>(null);

  const toggleFilter = (name: string) => {
    setFilterOpen((prev) => (prev === name ? null : name));
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Каталог</h2>

      {/* Фильтры */}
      <div className="flex flex-col justify-between gap-2 mb-6">
        {['Цена', 'Популярное', 'Новинки'].map((label) => (
          <div className="relative" key={label}>
            <button
              className="text-xs px-3 py-1.5 bg-green-600 text-white rounded-full shadow-sm hover:bg-green-700 transition"
              onClick={() => toggleFilter(label)}
            >
              {label} ▼
            </button>
            {filterOpen === label && (
              <div className="absolute left-0 mt-1 bg-white border shadow-lg rounded-md text-sm z-10">
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Опция 1</div>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Опция 2</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Популярные маски */}
      <h3 className="text-lg font-semibold mb-2">Популярные маски</h3>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {popularProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-xl p-3 shadow-sm hover:shadow-md transition text-left"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-28 object-cover rounded-lg mb-2"
            />
            <h4 className="text-sm font-medium text-gray-800">{product.name}</h4>
            <p className="text-sm text-gray-500">{product.price}</p>
          </div>
        ))}
      </div>

      {/* Инструкция */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-1">Инструкции</h3>
        <p className="text-sm text-gray-600 mb-3">
          Узнайте, как правильно использовать маску: от регулировки до хранения.
        </p>
        <div className="flex gap-2">
          <img
            src={sharedImage}
            className="w-1/2 rounded-lg"
            alt="инструкция 1"
          />
          <img
            src={sharedImage}
            className="w-1/2 rounded-lg"
            alt="инструкция 2"
          />
        </div>
      </div>

      {/* Рекомендуемые товары */}
      <h3 className="text-lg font-semibold mb-2">Рекомендуемое</h3>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {recommendedProducts.map((item) => (
          <div key={item.id} className="border rounded-xl p-2 text-center bg-white shadow-sm">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-20 object-cover rounded-lg mb-1"
            />
            <p className="text-xs text-gray-700">{item.name}</p>
          </div>
        ))}
      </div>

      {/* Кнопка назад */}
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

export default CatalogPage;