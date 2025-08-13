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

  // Calculate average rating and rating distribution
  const reviews = mask.reviews || [];
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;
  const ratingDistribution = [5, 4, 3, 2, 1].map((score) => ({
    score,
    width:
      totalReviews > 0
        ? `${(
            (reviews.filter((r) => Math.round(r.rating) === score).length /
              totalReviews) *
            100
          ).toFixed(0)}%`
        : "0%",
  }));

  return (
    <div className="min-w-full mx-auto bg-black min-h-screen">
      {/* Header */}
      <div className="flex items-center  py-4 border-b border-gray-100">
        <ArrowLeft
          onClick={() => navigate("/catalog")}
          className="w-6 h-6 text-white"
        />
        <p className="text-[22px] font-medium text-white ml-4">
          Детали маски
        </p>
      </div>

      {/* Mask Image */}
      <img
        src={mask.imageUrl || "https://via.placeholder.com/300"}
        alt={mask.name}
        className="w-1/2 h-1/2 object-contain mx-auto"
      />

      <div className=" pb-6">
        {/* Mask Name and Add Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">{mask.name}</h2>
      
        </div>

        {/* Description */}
        {mask.description && (
          <p className="text-sm text-white mb-6 leading-relaxed">
            {mask.description}
          </p>
        )}

        {/* Characteristics */}
        <div className="mb-6">
          <h3 className="text-base font-medium text-white mb-3">
            Характеристики
          </h3>
          <div className="space-y-3">
            {mask.weight && (
              <div className="flex justify-between">
                <span className="text-sm text-white">Вес</span>
                <span className="text-sm text-white">{mask.weight}</span>
              </div>
            )}
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
                <span className="text-sm text-white">
                  Диапазон затемнения
                </span>
                <span className="text-sm text-white">{mask.shadeRange}</span>
              </div>
            )}
            {mask.material && (
              <div className="flex justify-between">
                <span className="text-sm text-white">Материал</span>
                <span className="text-sm text-white">{mask.material}</span>
              </div>
            )}
            {mask.price && (
              <div className="flex justify-between">
                <span className="text-sm text-white">Цена</span>
                <span className="text-sm text-white">{mask.price}</span>
              </div>
            )}
            {mask.installment && (
              <div className="flex justify-between">
                <span className="text-sm text-white">Рассрочка</span>
                <span className="text-sm text-white">
                  {mask.installment}
                </span>
              </div>
            )}
            {mask.size && (
              <div className="flex justify-between">
                <span className="text-sm text-white">Размер</span>
                <span className="text-sm text-white">{mask.size}</span>
              </div>
            )}
            {mask.days && (
              <div className="flex justify-between">
                <span className="text-sm text-white">Срок</span>
                <span className="text-sm text-white">{mask.days}</span>
              </div>
            )}
            {mask.extraFields && mask.extraFields.length > 0 && (
              <>
                {mask.extraFields.map((field) => (
                  <div key={field.id} className="flex justify-between">
                    <span className="text-sm text-white">{field.key}</span>
                    <span className="text-sm text-white">{field.value}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Features */}
        {mask.features && mask.features.length > 0 && (
          <div className="mb-6">
            <h3 className="text-base font-medium text-white mb-3">
              Особенности
            </h3>
            <div className="space-y-2">
              {mask.features.map((feature) => (
                <div key={feature.id} className="flex items-center">
                  <div className="w-4 h-4 border border-gray-300 rounded mr-3"></div>
                  <span className="text-sm text-gray-700">{feature.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="mb-6">
            <h3 className="text-base font-medium text-white mb-3">Отзывы</h3>
            {/* Rating */}
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white mr-2">
                {averageRating.toFixed(1)}
              </span>
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-lg ${
                      star <= Math.round(averageRating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Rating Bars */}
            <div className="space-y-1 mb-4">
              {ratingDistribution.map(({ score, width }) => (
                <div key={score} className="flex items-center text-xs">
                  <span className="w-2 text-white">{score}</span>
                  <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-800 h-2 rounded-full"
                      style={{ width }}
                    ></div>
                  </div>
                  <span className="text-white">{width}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 mb-4">{totalReviews} отзывов</p>

            {/* Individual Reviews */}
            {reviews.map((review) => (
              <div key={review.id} className="flex items-start mb-4">
                <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                  {review.userName[0]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">
                    {review.userName}
                  </p>
                  <p className="text-xs text-gray-500 mb-1">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-sm ${
                          star <= Math.round(review.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  {review.comment && (
                    <p className="text-sm text-gray-700">{review.comment}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MaskDetails;
