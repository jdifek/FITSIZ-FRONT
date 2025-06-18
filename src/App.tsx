import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import WelcomePage from './pages/WelcomePage';
import MaskPage from './pages/MaskPage';
import CatalogPage from './pages/CatalogPage';
import VideoPage from './pages/VideoPage';
import ProfilePage from './pages/ProfilePage';
import { UserProvider } from '../context/AuthContext';

const App: React.FC = () => (
  <Router>
    <UserProvider>
      <div className="min-h-screen bg-white text-gray-900 font-sans">
        <header className="w-full bg-green-600 text-white p-6 text-center shadow-md">
          <h1 className="text-2xl font-bold tracking-wide">FITSIZ</h1>
        </header>
        <div className="flex flex-col items-center justify-start p-6 max-w-md mx-auto min-h-[calc(100vh-80px)]">
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/mask" element={<MaskPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </UserProvider>
  </Router>
);

export default App;