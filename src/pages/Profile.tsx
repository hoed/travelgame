// src/pages/Profile.tsx
import { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { useWallet } from '../contexts/WalletContext';
import { useLanguage } from '../contexts/LanguageContext';
import './Profile.css';

const Profile = () => {
  const { userStats, achievements } = useGame();
  const { tokenBalance, useNonCryptoMode, toggleNonCryptoMode } = useWallet();
  const { t, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements' | 'settings'>('stats');

  const userName = window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'Explorer';
  const userPhoto = window.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url;

  const unlockedAchievements = achievements.filter((a) => a.unlocked);
  const lockedAchievements = achievements.filter((a) => !a.unlocked);

  const getTravelerRank = (level: number) => {
    if (level >= 50) return { title: 'Legendary Explorer', color: '#FFD700' };
    if (level >= 40) return { title: 'Master Traveler', color: '#E5E4E2' };
    if (level >= 30) return { title: 'Expert Navigator', color: '#CD7F32' };
    if (level >= 20) return { title: 'Seasoned Adventurer', color: '#4169E1' };
    if (level >= 10) return { title: 'Experienced Backpacker', color: '#32CD32' };
    if (level >= 5) return { title: 'Active Wanderer', color: '#FF6347' };
    return { title: 'Novice Explorer', color: '#9370DB' };
  };

  const travelerRank = getTravelerRank(userStats.level);
  const totalDistance = userStats.placesVisited * 25;
  const regionsExplored = Math.min(Math.floor(userStats.placesVisited / 3), 8);

  return (
    <div className="profile-container">
      {/* ... your beautiful header stays exactly the same ... */}
      <div className="profile-header">
        {/* ... avatar, name, rank, level bar, journey stats — unchanged ... */}
        {/* (keeping your original code here — it's perfect) */}
      </div>

      <div className="profile-tabs">
        {/* ... tabs — unchanged ... */}
      </div>

      <div className="profile-content">
        {/* STATS & ACHIEVEMENTS TABS — unchanged — perfect as-is */}

        {activeTab === 'settings' && (
          <div className="settings-tab">
            {/* Language */}
            <div className="settings-section">
              <h3>{t('profile.language')}</h3>
              <div className="language-options">
                <button
                  className={`language-btn ${language === 'en' ? 'active' : ''}`}
                  onClick={() => setLanguage('en')}
                >
                  English
                </button>
                <button
                  className={`language-btn ${language === 'id' ? 'active' : ''}`}
                  onClick={() => setLanguage('id')}
                >
                  Bahasa Indonesia
                </button>
              </div>
            </div>

            {/* Wallet */}
            <div className="settings-section">
              <h3>{t('profile.wallet')}</h3>
              <div className="wallet-section">
                {/* Non-Crypto Toggle */}
                <div className="wallet-mode-toggle">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={useNonCryptoMode}
                      onChange={toggleNonCryptoMode}
                    />
                    <span className="toggle-slider" />
                    <span className="toggle-text">
                      {t('wallet.non_crypto_mode')}
                    </span>
                  </label>
                </div>

                {/* Reown AppKit Button — NO IMPORT NEEDED */}
                {!useNonCryptoMode && (
                  <div className="wallet-connection" style={{ marginTop: '20px', textAlign: 'center' }}>
                    <w3m-button size="lg" label="Connect Wallet" />
                  </div>
                )}

                {/* Show Balance */}
                {tokenBalance && !useNonCryptoMode && (
                  <p className="wallet-balance" style={{ marginTop: '16px', fontSize: '18px', fontWeight: 'bold' }}>
                    Balance: {parseFloat(tokenBalance || '0').toFixed(2)} SMT
                  </p>
                )}
              </div>
            </div>

            {/* About */}
            <div className="settings-section">
              <h3>About</h3>
              <p className="about-text">Smartour v1.0.0 - Explore Indonesia, Earn Rewards</p>
              <p className="about-text">A Telegram Mini App for discovering Indonesia's amazing destinations</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;