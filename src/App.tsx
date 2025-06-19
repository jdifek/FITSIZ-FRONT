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
      <div className="mt-15 bg-white text-gray-900 font-sans">
        <header className="w-full bg-green-600 text-white p-6 text-center shadow-md">
          <h1 className="text-2xl font-bold tracking-wide">FITSIZ</h1>
        </header>
        <div className="flex flex-col items-center justify-start p-6 max-w-md mx-auto min-h-[calc(100vh-225px + 60px)]">
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/mask" element={<MaskPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>

        <footer className="mt-10 py-4 bg-gray-100 text-gray-600 text-sm text-center">
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
