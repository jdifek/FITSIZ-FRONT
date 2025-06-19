import React from "react";
import { useNavigate } from "react-router-dom";

type VideoType = {
  id: number;
  title: string;
  description: string;
  duration: string;
  thumbnailUrl: string;
};

const mockVideos: VideoType[] = [
  {
    id: 1,
    title: "Как выбрать маску",
    description: "Узнайте, как подобрать маску под ваш тип лица и задачи.",
    duration: "10 мин",
    thumbnailUrl: "https://www.tuttosaldatura.it/3376-large_default/maschera-automatica-esab-sentinel-a60-0700600860.jpg",
  },
  {
    id: 2,
    title: "Настройка маски",
    description: "Пошаговая настройка посадки, фильтра и режима.",
    duration: "15 мин",
    thumbnailUrl: "https://www.tuttosaldatura.it/3376-large_default/maschera-automatica-esab-sentinel-a60-0700600860.jpg",
  },
  {
    id: 3,
    title: "Советы по уходу",
    description: "Хранение, чистка и замена линз для долговечности.",
    duration: "12 мин",
    thumbnailUrl: "https://www.tuttosaldatura.it/3376-large_default/maschera-automatica-esab-sentinel-a60-0700600860.jpg",
  },
];

const VideoPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Видео уроки</h2>

      <div className="space-y-4">
        {mockVideos.map((video) => (
          <div
            key={video.id}
            className="flex items-start bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={() => navigate(`/video/${video.id}`)}
          >
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="ml-4 flex-1">
              <p className="text-xs text-gray-400">{video.duration}</p>
              <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                {video.title}
              </h3>
              <p className="text-xs text-gray-600 mt-1">{video.description}</p>
            </div>
          </div>
        ))}
      </div>

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

export default VideoPage;
