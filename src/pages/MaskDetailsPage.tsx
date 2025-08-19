import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api, { type MasksType } from "../api/api";

const MaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mask, setMask] = useState<MasksType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api
        .getMaskDetails(parseInt(id))
        .then((data: MasksType) => {
          setMask(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Ошибка загрузки деталей маски:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!mask) {
    return (
      <div className="text-center text-white mt-20">Маска не найдена</div>
    );
  }

  // Reviews
  const reviews = mask.reviews || [];
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;

  return (
    <div className="min-w-full mx-auto bg-black min-h-screen">
      {/* Header */}
      <div className="flex items-center py-4 border-b border-gray-100">
        <ArrowLeft
          onClick={() => navigate("/catalog")}
          className="w-6 h-6 text-white cursor-pointer"
        />
        <p className="text-[22px] font-medium text-white ml-4">
          Детали маски
        </p>
      </div>

      {/* Image */}
      <img
        src={mask.imageUrl || "https://via.placeholder.com/300"}
        alt={mask.name}
        className="w-1/2 h-1/2 object-contain mx-auto"
      />

      <div className="pb-6">
        {/* Название */}
        <h2 className="text-xl font-semibold text-white mt-4 text-center">
          {mask.name}
        </h2>

        {/* Описание */}
        {mask.description && (
          <p className="text-sm text-gray-300 mt-2 text-center px-4">
            {mask.description}
          </p>
        )}

        {/* Характеристики */}
        <div className="mt-6 px-4">
          <h3 className="text-base font-medium text-white mb-3">
            Характеристики
          </h3>
          <div className="space-y-3">
            {mask.viewArea && (
              <div className="flex justify-between">
                <span className="text-sm text-white">Область обзора</span>
                <span className="text-sm text-white">{mask.viewArea}</span>
              </div>
            )}
            {mask.sensors && (
              <div className="flex justify-between">
                <span className="text-sm text-white">Сенсоры</span>
                <span className="text-sm text-white">{mask.sensors}</span>
              </div>
            )}
            {mask.power && (
              <div className="flex justify-between">
                <span className="text-sm text-white">Питание</span>
                <span className="text-sm text-white">{mask.power}</span>
              </div>
            )}
            {mask.shadeRange && (
              <div className="flex justify-between">
                <span className="text-sm text-white">Диапазон затемнения</span>
                <span className="text-sm text-white">{mask.shadeRange}</span>
              </div>
            )}
            {mask.weight && (
              <div className="flex justify-between">
                <span className="text-sm text-white">Вес</span>
                <span className="text-sm text-white">{mask.weight} кг</span>
              </div>
            )}
            {mask.material && (
              <div className="flex justify-between">
                <span className="text-sm text-white">Материал</span>
                <span className="text-sm text-white">{mask.material}</span>
              </div>
            )}
            {mask.ExtraField.length > 0 &&
              mask.ExtraField.map((field) => (
                <div key={field.id} className="flex justify-between">
                  <span className="text-sm text-white">{field.key}</span>
                  <span className="text-sm text-white">{field.value}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Особенности */}
        {mask.features.length > 0 && (
          <div className="mt-6 px-4">
            <h3 className="text-base font-medium text-white mb-3">
              Особенности
            </h3>
            <ul className="list-disc list-inside text-sm text-white space-y-1">
              {mask.features.map((f) => (
                <li key={f.id}>{f.name}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Отзывы */}
        {reviews.length > 0 && (
          <div className="mt-6 px-4">
            <h3 className="text-base font-medium text-white mb-3">
              Отзывы ({totalReviews})
            </h3>
            <p className="text-white mb-2">Средняя оценка: {averageRating.toFixed(1)} ⭐</p>
            {reviews.map((review) => (
              <div key={review.id} className="mb-3 border-b border-gray-700 pb-2">
                <p className="text-sm font-medium text-white">{review.userName}</p>
                <p className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
                <p className="text-yellow-400">
                  {"★".repeat(Math.round(review.rating))}
                </p>
                {review.comment && (
                  <p className="text-sm text-white">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MaskDetails;
