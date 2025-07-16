import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { type VideoType } from "../api/api";

const VideoPage: React.FC = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getVideos()
      .then((data: VideoType[]) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка загрузки видео:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600 mt-20">Загрузка...</div>;
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Видео уроки</h2>

      {videos.length > 0 ? (
        <div className="space-y-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="flex items-start bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition cursor-pointer"
              onClick={() => navigate(`/video/${video.id}`)}
            >
              <img
                src={video.thumbnailUrl || "https://via.placeholder.com/150"}
                alt={video.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="ml-4 flex-1">
                {video.duration && (
                  <p className="text-xs text-gray-400">{video.duration}</p>
                )}
                <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-xs text-gray-600 mt-1">{video.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Видео пока недоступны</p>
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

export default VideoPage;