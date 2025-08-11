import React from "react";
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

const AppContent: React.FC = () => {
  const location = useLocation();

  // Определим фон в зависимости от текущего пути
  const isWelcomePage = location.pathname === "/welcome";
  const backgroundClass = isWelcomePage ? "bg-black text-white" : "bg-black text-white";

  return (
    <div className={`min-h-screen flex flex-col font-sans ${backgroundClass}`}>
      {/* Хедер */}
      <header className="w-full mt-20 shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-2 flex justify-between items-center">
          <Link to={'/welcome'} className="flex items-center gap-3">
            <img src="/2.1.png" className="w-30 h-14" />
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
