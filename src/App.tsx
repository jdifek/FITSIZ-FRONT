import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import WelcomePage from "./pages/WelcomePage";
import MaskPage from "./pages/MaskPage";
import CatalogPage from "./pages/CatalogPage";
import VideoPage from "./pages/VideoPage";
import ProfilePage from "./pages/ProfilePage";
import { UserProvider } from "../context/AuthContext";
import { FaInfoCircle, FaPhone } from "react-icons/fa";

const App: React.FC = () => (
  <Router>
    <UserProvider>
      {/* Wrapper на всю высоту экрана */}
      <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
        {/* Хедер */}
        <header className="w-full mt-20 bg-green-600 text-white p-6 text-center shadow-md">
          <h1 className="text-2xl font-bold tracking-wide">FITSIZ</h1>
        </header>

        {/* Контент (растягивается по высоте) */}
        <main className="flex-1 flex flex-col items-center justify-start p-6 max-w-md mx-auto w-full">
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/mask" element={<MaskPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>

        {/* Футер */}
        <footer className="py-4 pb-6 bg-gray-100 text-gray-600 text-sm text-center w-full">
          <div className="flex justify-center items-center gap-4">
            <div className="flex items-center gap-1">
              <FaInfoCircle />
              <span>О нас</span>
            </div>
            <div className="flex items-center gap-1">
              <FaPhone />
              <span>Поддержка</span>
            </div>
          </div>
          <p className="mt-2">© 2025 MaskApp. Все права защищены.</p>
        </footer>
      </div>
    </UserProvider>
  </Router>
);

export default App;
