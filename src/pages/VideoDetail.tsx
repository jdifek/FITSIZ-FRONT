import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api, { type VideoType } from "../api/api";

const VideoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<VideoType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api
        .getVideos() // Replace with api.getVideo(id) if endpoint exists
        .then((data: VideoType[]) => {
          const foundVideo = data.find((v) => v.id === parseInt(id));
          setVideo(foundVideo || null);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Ошибка загрузки видео:", error);
          setLoading(false);
        });
    }
  }, [id]);
  function extractYoutubeId(url: string): string | null {
    const match = url.match(/(?:youtube\.com.*[?&]v=|youtu\.be\/)([^&#]+)/);
    return match ? match[1] : null;
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );  }

  if (!video) {
    return <div className="text-center text-white mt-20">Видео не найдено</div>;
  }

  return (
    <div className="!min-w-full bg-black min-h-screen">
      <div className="flex items-center px-4 py-4 border-b border-gray-100">
        <ArrowLeft onClick={() => navigate("/video")} className="w-6 h-6 text-white" />
        <p className="text-[22px] font-medium text-white ml-4">{video.title}</p>
      </div>
      <div className="">
        {video.url ? (
       <iframe
       width="100%"
       height="240"
       className="rounded-lg mb-4"
       src={`https://www.youtube.com/embed/${extractYoutubeId(video.url || "")}`}
       title="YouTube video player"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
       allowFullScreen
     />
     
        ) : (
          <img
            src={video.thumbnailUrl || "https://via.placeholder.com/300"}
            alt={video.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}
        <h2 className="text-xl font-semibold text-white mb-2">{video.title}</h2>
        {video.description && (
          <p className="text-sm text-white mb-4">{video.description}</p>
        )}
        {video.duration && (
          <p className="text-sm text-white">Длительность: {video.duration}</p>
        )}
      </div>
    </div>
  );
};

export default VideoDetail;