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
      {/* Your beautiful header */}
      <div className="profile-header">
        <div className="profile-avatar">
          {userPhoto ? (
            <img src={userPhoto} alt={userName} />
          ) : (
            <div className="avatar-placeholder">{userName[0]?.toUpperCase()}</div>
          )}
          <div className="avatar-badge" style={{ background: travelerRank.color }}>
            {travelerRank.title.split(' ')[0]}
          </div>
        </div>
        <h1>{userName}</h1>
        <p className="traveler-rank" style={{ color: travelerRank.color }}>
          {travelerRank.title}
        </p>
        <div className="profile-level">
          <span className="level-badge">Level {userStats.level}</span>
          <div className="xp-bar">
            <div className="xp-fill" style={{ width: `${(userStats.xp / userStats.xpToNextLevel) * 100}%` }} />
          </div>
          <span className="xp-text">{userStats.xp} / {userStats.xpToNextLevel} XP</span>
        </div>
        <div className="journey-stats">
          <div className="journey-stat">
            <span className="journey-icon">Map</span>
            <span className="journey-value">{regionsExplored}/8</span>
            <span className="journey-label">Regions</span>
          </div>
          <div className="journey-stat">
            <span className="journey-icon">Road</span>
            <span className="journey-value">{totalDistance}km</span>
            <span className="journey-label">Traveled</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <button className={activeTab === 'stats' ? 'active' : ''} onClick={() => setActiveTab('stats')}>
          {t('profile.stats')}
        </button>
        <button className={activeTab === 'achievements' ? 'active' : ''} onClick={() => setActiveTab('achievements')}>
          {t('profile.achievements')}
        </button>
        <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
          {t('profile.settings')}
        </button>
      </div>

      {/* Content */}
      <div className="profile-content">
        {/* STATS & ACHIEVEMENTS — keep your original code */}

        {activeTab === 'settings' && (
          <div className="settings-tab">
            {/* Language */}
            <div className="settings-section">
              <h3>{t('profile.language')}</h3>
              <div className="language-options">
                <button className={`language-btn ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>
                  English
                </button>
                <button className={`language-btn ${language === 'id' ? 'active' : ''}`} onClick={() => setLanguage('id')}>
                  Bahasa Indonesia
                </button>
              </div>
            </div>

            {/* Wallet */}
            <div className="settings-section">
              <h3>{t('profile.wallet')}</h3>
              <div className="wallet-section">
                <div className="wallet-mode-toggle">
                  <label className="toggle-label">
                    <input type="checkbox" checked={useNonCryptoMode} onChange={toggleNonCryptoMode} />
                    <span className="toggle-slider" />
                    <span className="toggle-text">{t('wallet.non_crypto_mode')}</span>
                  </label>
                </div>

                {!useNonCryptoMode && (
                  <div style={{ margin: '20px 0', textAlign: 'center' }}>
                    <w3m-button size="lg" />
                  </div>
                )}

                {tokenBalance && !useNonCryptoMode && (
                  <p style={{ textAlign: 'center', fontSize: '18px', marginTop: '10px' }}>
                    Balance: {parseFloat(tokenBalance).toFixed(2)} SMT
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;