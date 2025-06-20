import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MaskDetails = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Шапка */}  
      <div className="flex items-center px-4 py-4 border-b border-gray-100">
        <ArrowLeft onClick={() => navigate('/catalog')} className="w-6 h-6 text-gray-600" />
        <p className="text-[22px] font-medium text-gray-900 ml-4">Детали маски</p>
      </div>

      {/* Изображение маски */}
      <img 
        src="https://www.tuttosaldatura.it/3376-large_default/maschera-automatica-esab-sentinel-a60-0700600860.jpg"
        alt="Сварочная маска ArcShield Pro"
        className="w-1/2 h-1/2 object-contain mx-auto"
      />

      <div className="px-4 pb-6">
        {/* Название товара */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">ArcShield Pro</h2>
        
        {/* Описание */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          ArcShield Pro разработана как для новичков, так и для опытных сварщиков, обеспечивая высокую защиту и комфорт.
        </p>

        {/* Характеристики */}
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-3">Характеристики</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Вес</span>
              <span className="text-sm text-gray-900">1.2 кг</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Область обзора</span>
              <span className="text-sm text-gray-900">3.94" x 3.25"</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Сенсоры</span>
              <span className="text-sm text-gray-900">4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Питание</span>
              <span className="text-sm text-gray-900">Солнечное/Батарея</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Диапазон затемнения</span>
              <span className="text-sm text-gray-900">DIN 9–13</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Материал</span>
              <span className="text-sm text-gray-900">Нейлон</span>
            </div>
          </div>
        </div>

        {/* Особенности */}
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-3">Особенности</h3>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-4 h-4 border border-gray-300 rounded mr-3"></div>
              <span className="text-sm text-gray-700">Автоматическое затемнение</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 border border-gray-300 rounded mr-3"></div>
              <span className="text-sm text-gray-700">Регулировка чувствительности</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 border border-gray-300 rounded mr-3"></div>
              <span className="text-sm text-gray-700">Режим шлифовки</span>
            </div>
          </div>
        </div>

        {/* Отзывы */}
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-3">Отзывы</h3>
          
          {/* Рейтинг */}
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-gray-900 mr-2">4.7</span>
            <div className="flex mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-yellow-400 text-lg">★</span>
              ))}
            </div>
          </div>

          {/* Полоски рейтинга */}
          <div className="space-y-1 mb-4">
            {[{ score: 5, width: '70%' }, { score: 4, width: '20%' }, { score: 3, width: '5%' }, { score: 2, width: '3%' }, { score: 1, width: '2%' }].map(({ score, width }) => (
              <div key={score} className="flex items-center text-xs">
                <span className="w-2 text-gray-600">{score}</span>
                <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-800 h-2 rounded-full" style={{ width }}></div>
                </div>
                <span className="text-gray-600">{width}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 mb-4">125 отзывов</p>

          {/* Пример отзыва */}
          <div className="flex items-start">
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
              Е
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Евгений Картер</p>
              <p className="text-xs text-gray-500 mb-1">2 месяца назад</p>
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-sm text-gray-700">
                Отличная маска! Автоматическое затемнение работает отлично.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaskDetails;
