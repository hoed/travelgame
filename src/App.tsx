import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import { WalletProvider } from './contexts/WalletContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Home from './pages/Home';
import Map from './pages/Map';
import Quests from './pages/Quests';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Rewards from './pages/Rewards';
import QuestDetail from './pages/QuestDetail';
import CheckIn from './pages/CheckIn';
import Onboarding from './pages/Onboarding';
import Navigation from './components/Navigation';
import './App.css';

function AppContent() {
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const onboarded = localStorage.getItem('onboarded');
    setIsOnboarded(onboarded === 'true');
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboarded', 'true');
    setIsOnboarded(true);
  };

  if (!isOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/quests" element={<Quests />} />
        <Route path="/quests/:id" element={<QuestDetail />} />
        <Route path="/check-in/:locationId" element={<CheckIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Navigation />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <WalletProvider>
        <GameProvider>
          <Router>
            <AppContent />
          </Router>
        </GameProvider>
      </WalletProvider>
    </LanguageProvider>
  );
}

export default App;
