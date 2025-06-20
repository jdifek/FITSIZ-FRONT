import React, { useState } from "react";
import { Search, SlidersHorizontal, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ProductType = {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  installment?: string;
  size?: string;
  days?: string;
};

const sharedImage =
  "https://www.tuttosaldatura.it/3376-large_default/maschera-automatica-esab-sentinel-a60-0700600860.jpg";

const popularProducts: ProductType[] = [
  {
    id: 1,
    name: "Автоматическая маска ArcShield Pro",
    price: "7 999₽",
    installment: "2 000₽ x 4",
    imageUrl: sharedImage,
    size: "37 EU",
    days: "29 дней",
  },
  {
    id: 2,
    name: "Фиксированная маска WeldMaster",
    price: "4 499₽",
    installment: "1 125₽ x 4",
    imageUrl: sharedImage,
    size: "35.5 EU",
    days: "17 дней",
  },
  {
    id: 3,
    name: "Пассивная маска BasicWeld",
    price: "2 999₽",
    installment: "750₽ x 4",
    imageUrl: sharedImage,
    size: "36 EU",
    days: "25 дней",
  },
  {
    id: 4,
    name: "Маска ProSafe Advanced",
    price: "9 499₽",
    installment: "2 375₽ x 4",
    imageUrl: sharedImage,
    size: "38 EU",
    days: "15 дней",
  },
];

const recommendedProducts: ProductType[] = [
  {
    id: 5,
    name: "Перчатки WelderPro",
    price: "1 499₽",
    installment: "375₽ x 4",
    imageUrl: sharedImage,
    size: "L",
    days: "12 дней",
  },
  {
    id: 6,
    name: "Куртка сварщика SafeGuard",
    price: "5 999₽",
    installment: "1 500₽ x 4",
    imageUrl: sharedImage,
    size: "XL",
    days: "20 дней",
  },
];

const CatalogPage: React.FC = () => {
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const navigate = useNavigate(); // ← добавлено

  const handleProductClick = (id: number) => {
    console.log("Navigate to product:", id);
    navigate(`/details/${id}`);
  };

  const toggleLike = (id: number) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <h1 className="!text-[24px] font-bold text-gray-900">Каталог</h1>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#42BA1A] rounded-2xl flex items-center justify-center">
            <Search className="w-4 h-4 text-white" />
          </div>
          <div className="w-9 h-9 bg-[#42BA1A] rounded-2xl flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-4">
          {popularProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="cursor-pointer"
            >
              {/* Heart Icon */}
              <div className="relative mb-3">
                <Heart
                  className={`w-6 h-6 text-red-500 ${
                    likedItems.has(product.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(product.id);
                  }}
                />
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-2xl bg-gray-100"
                />

             
              </div>

              {/* Price */}
              <div className="mb-1">
                <span className="text-lg font-bold text-gray-900">
                  {product.price}
                </span>
              </div>

              {/* Installment */}
              <div className="mb-2">
                <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded">
                  {product.installment} в сплит
                </span>
              </div>

              {/* Product Name */}
              <h3 className="text-sm font-medium text-gray-900 mb-2 leading-tight">
                {product.name}
              </h3>

              {/* Size and Days */}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Heart className="w-3 h-3 text-red-400" />
                <span>{product.size}</span>
                <span>•</span>
                <span>{product.days}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recommended Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Рекомендуемое
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {recommendedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="cursor-pointer"
              >
                {/* Heart Icon */}
                <div className="relative mb-3">
                <Heart
                  className={`w-6 h-6 text-red-500 ${
                    likedItems.has(product.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(product.id);
                  }}
                />
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-2xl bg-gray-100"
                  />

                
                </div>

                {/* Price */}
                <div className="mb-1">
                  <span className="text-lg font-bold text-gray-900">
                    {product.price}
                  </span>
                </div>

                {/* Installment */}
                <div className="mb-2">
                  <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded">
                    {product.installment} в сплит
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="text-sm font-medium text-gray-900 mb-2 leading-tight">
                  {product.name}
                </h3>

                {/* Size and Days */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Heart className="w-3 h-3 text-red-400" />
                  <span>{product.size}</span>
                  <span>•</span>
                  <span>{product.days}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
