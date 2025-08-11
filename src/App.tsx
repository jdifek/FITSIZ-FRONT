import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import WelcomePage from "./pages/WelcomePage";
import MaskPage from "./pages/MaskPage";
import CatalogPage from "./pages/CatalogPage";
import VideoPage from "./pages/VideoPage";
import ProfilePage from "./pages/ProfilePage";
import { UserProvider } from "../context/AuthContext";
import BottomNav from "./components/BottomNav";
import MaskDetailsPage from "./pages/MaskDetailsPage";
import VideoDetail from "./pages/VideoDetail";
import QuizPage from "./pages/QuizPage";

// Компонент для предзагрузки изображений
const useImagePreloader = (imageUrls: string[]) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = imageUrls.length;

    if (totalImages === 0) {
      setImagesLoaded(true);
      return;
    }

    const imagePromises = imageUrls.map((url) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
          resolve();
        };
        img.src = url;
      });
    });

    Promise.all(imagePromises).then(() => {
      // Минимальная задержка для плавности
      setTimeout(() => setImagesLoaded(true), 100);
    });
  }, [imageUrls]);

  return imagesLoaded;
};

// Компонент загрузки
const LoadingScreen: React.FC = () => (
  <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-white text-lg">Загрузка...</p>
    </div>
  </div>
);

const AppContent: React.FC = () => {
  const location = useLocation();
  
  // Предзагружаем основные изображения
  const imagesLoaded = useImagePreloader(["/2.1.png", "/image.png"]);

  // Определим фон в зависимости от текущего пути
  const isWelcomePage = location.pathname === "/welcome";
  const backgroundClass = isWelcomePage ? "bg-black text-white" : "bg-white text-gray-900";

  // Показываем загрузку пока изображения не загружены
  if (!imagesLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${backgroundClass}`}>
      {/* Хедер */}
      <header className="w-full mt-20 shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-2 flex justify-between items-center">
          <Link to={'/welcome'} className="flex items-center gap-3">
            <img 
              src={isWelcomePage ? "/2.1.png" : "/image.png"} 
              className="w-30 h-14 transition-opacity duration-300" 
              alt="Logo"
            />
          </Link>
        </div>
      </header>

      {/* Контент */}
      <main className="flex-1 flex flex-col items-center justify-start p-6 px-[10px] pb-24 max-w-md mx-auto w-full">
        <Routes>
          <Route path="/details/:id" element={<MaskDetailsPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/" element={<AuthPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/mask" element={<MaskPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      <BottomNav />
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <UserProvider>
      <AppContent />
    </UserProvider>
  </Router>
);

export default App;