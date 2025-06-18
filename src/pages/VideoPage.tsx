import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { type videosType } from '../api/api';
import { useUserContext } from '../../context/AuthContext';

const VideoPage: React.FC = () => {
  const { user } = useUserContext();
  const [videos, setVideos] = useState<videosType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      api.getVideos().then((data) => setVideos(data));
    }
  }, [user]);

  return (
    <div className="text-center mt-4">
      <h2 className="text-xl font-bold">Видео</h2>
      {videos.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {videos.map((video) => (
            <li key={video.id}>{video.title}</li>
          ))}
        </ul>
      ) : (
        <p>Заглушка для раздела "Видео"</p>
      )}
      <button
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
        onClick={() => navigate('/welcome')}
      >
        Назад
      </button>
    </div>
  );
};

export default VideoPage;