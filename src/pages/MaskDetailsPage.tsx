import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useUserContext } from "../../context/AuthContext";
import api, { type MasksType } from "../api/api";

const MaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, setUser } = useUserContext();
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

  const handleAddToMyMasks = () => {
    if (user?.telegramId && mask?.id) {
      setLoading(true);
      api
        .updateProfile(
          user.telegramId,
          user.phone || "",
          user.email || "",
          mask.id,
          undefined,
          true
        )
        .then((updatedUser) => {
          setUser(updatedUser);
          navigate("/mask");
        })
        .catch((error) => {
          console.error("Ошибка добавления маски:", error);
        })
        .finally(() => setLoading(false));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!mask) {
    return (
      <div className="text-center text-gray-600 mt-20">Маска не найдена</div>
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
    <div className="min-w-full mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center  py-4 border-b border-gray-100">
        <ArrowLeft
          onClick={() => navigate("/catalog")}
          className="w-6 h-6 text-gray-600"
        />
        <p className="text-[22px] font-medium text-gray-900 ml-4">
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
          <h2 className="text-xl font-semibold text-gray-900">{mask.name}</h2>
          <button
            onClick={handleAddToMyMasks}
            disabled={!user?.telegramId}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            +
          </button>
        </div>

        {/* Description */}
        {mask.description && (
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            {mask.description}
          </p>
        )}

        {/* Characteristics */}
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-3">
            Характеристики
          </h3>
          <div className="space-y-3">
            {mask.weight && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Вес</span>
                <span className="text-sm text-gray-900">{mask.weight}</span>
              </div>
            )}
            {mask.viewArea && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Область обзора</span>
                <span className="text-sm text-gray-900">{mask.viewArea}</span>
              </div>
            )}
            {mask.sensors && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Сенсоры</span>
                <span className="text-sm text-gray-900">{mask.sensors}</span>
              </div>
            )}
            {mask.power && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Питание</span>
                <span className="text-sm text-gray-900">{mask.power}</span>
              </div>
            )}
            {mask.shadeRange && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">
                  Диапазон затемнения
                </span>
                <span className="text-sm text-gray-900">{mask.shadeRange}</span>
              </div>
            )}
            {mask.material && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Материал</span>
                <span className="text-sm text-gray-900">{mask.material}</span>
              </div>
            )}
            {mask.price && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Цена</span>
                <span className="text-sm text-gray-900">{mask.price}</span>
              </div>
            )}
            {mask.installment && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Рассрочка</span>
                <span className="text-sm text-gray-900">
                  {mask.installment}
                </span>
              </div>
            )}
            {mask.size && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Размер</span>
                <span className="text-sm text-gray-900">{mask.size}</span>
              </div>
            )}
            {mask.days && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Срок</span>
                <span className="text-sm text-gray-900">{mask.days}</span>
              </div>
            )}
            {mask.extraFields && mask.extraFields.length > 0 && (
              <>
                {mask.extraFields.map((field) => (
                  <div key={field.id} className="flex justify-between">
                    <span className="text-sm text-gray-600">{field.key}</span>
                    <span className="text-sm text-gray-900">{field.value}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Features */}
        {mask.features && mask.features.length > 0 && (
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-900 mb-3">
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
            <h3 className="text-base font-medium text-gray-900 mb-3">Отзывы</h3>
            {/* Rating */}
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-gray-900 mr-2">
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
                  <span className="w-2 text-gray-600">{score}</span>
                  <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-800 h-2 rounded-full"
                      style={{ width }}
                    ></div>
                  </div>
                  <span className="text-gray-600">{width}</span>
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
                  <p className="text-sm font-medium text-gray-900">
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
