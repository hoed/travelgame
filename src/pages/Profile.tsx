// src/pages/Profile.tsx
import { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { useWallet } from '../contexts/WalletContext';
import { useLanguage } from '../contexts/LanguageContext';
import './Profile.css';

// Type declaration for w3m-button (Reown AppKit)
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'w3m-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        size?: 'sm' | 'md' | 'lg';
        label?: string;
      };
    }
  }
}

const Profile = () => {
  const { userStats, achievements } = useGame();
  const { tokenBalance, useNonCryptoMode, toggleNonCryptoMode } = useWallet();
  const { t, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements' | 'settings'>('stats');

  const userName = window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'Explorer';
  const userPhoto = window.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url;

  const unlockedAchievements = achievements.filter((a) => a.unlocked);
  const lockedAchievements = achievements.filter((a) => !a.unlocked);

  // Traveler Rank System
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

  // Calculate journey stats
  const totalDistance = userStats.placesVisited * 25; // Estimate km traveled
  const regionsExplored = Math.min(Math.floor(userStats.placesVisited / 3), 8); // Max 8 regions

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {userPhoto ? (
            <img src={userPhoto} alt={userName} />
          ) : (
            <div className="avatar-placeholder">
              {userName.charAt(0).toUpperCase()}
            </div>
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
            <div
              className="xp-fill"
              style={{
                width: `${(userStats.xp / userStats.xpToNextLevel) * 100}%`,
              }}
            />
          </div>
          <span className="xp-text">
            {userStats.xp} / {userStats.xpToNextLevel} XP
          </span>
        </div>
        <div className="journey-stats">
          <div className="journey-stat">
            <span className="journey-icon">🗺️</span>
            <span className="journey-value">{regionsExplored}/8</span>
            <span className="journey-label">Regions</span>
          </div>
          <div className="journey-stat">
            <span className="journey-icon">🛣️</span>
            <span className="journey-value">{totalDistance}km</span>
            <span className="journey-label">Traveled</span>
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={activeTab === 'stats' ? 'active' : ''}
          onClick={() => setActiveTab('stats')}
        >
          {t('profile.stats')}
        </button>
        <button
          className={activeTab === 'achievements' ? 'active' : ''}
          onClick={() => setActiveTab('achievements')}
        >
          {t('profile.achievements')}
        </button>
        <button
          className={activeTab === 'settings' ? 'active' : ''}
          onClick={() => setActiveTab('settings')}
        >
          {t('profile.settings')}
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'stats' && (
          <div className="stats-tab">
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <span className="stat-value">
                    {useNonCryptoMode
                      ? localStorage.getItem('gameCredits') || '0'
                      : tokenBalance ?? '0'}
                  </span>
                  <span className="stat-label">
                    {useNonCryptoMode ? 'Game Credits' : 'SMT Tokens'}
                  </span>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon">🎯</div>
                <div className="stat-info">
                  <span className="stat-value">{userStats.questsCompleted}</span>
                  <span className="stat-label">Quests Completed</span>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon">📍</div>
                <div className="stat-info">
                  <span className="stat-value">{userStats.placesVisited}</span>
                  <span className="stat-label">Places Visited</span>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon">🔥</div>
                <div className="stat-info">
                  <span className="stat-value">{userStats.streak}</span>
                  <span className="stat-label">Day Streak</span>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon">🏆</div>
                <div className="stat-info">
                  <span className="stat-value">{unlockedAchievements.length}</span>
                  <span className="stat-label">Achievements</span>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <span className="stat-value">#{userStats.rank || 'N/A'}</span>
                  <span className="stat-label">Global Rank</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="achievements-tab">
            {unlockedAchievements.length > 0 && (
              <div className="achievements-section">
                <h3>Unlocked ({unlockedAchievements.length})</h3>
                <div className="achievements-grid">
                  {unlockedAchievements.map((achievement) => (
                    <div key={achievement.id} className="achievement-item unlocked">
                      <div className="achievement-icon-large">
                        {achievement.icon}
                      </div>
                      <h4>{t(achievement.nameId)}</h4>
                      <p>{t(achievement.descriptionId)}</p>
                      {achievement.unlockedAt && (
                        <span className="unlock-date">
                          {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {lockedAchievements.length > 0 && (
              <div className="achievements-section">
                <h3>Locked ({lockedAchievements.length})</h3>
                <div className="achievements-grid">
                  {lockedAchievements.map((achievement) => (
                    <div key={achievement.id} className="achievement-item locked">
                      <div className="achievement-icon-large grayscale">
                        {achievement.icon}
                      </div>
                      <h4>{t(achievement.nameId)}</h4>
                      <p>{t(achievement.descriptionId)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-tab">
            <div className="settings-section">
              <h3>{t('profile.language')}</h3>
              <div className="language-options">
                <button
                  className={`language-btn ${language === 'en' ? 'active' : ''}`}
                  onClick={() => setLanguage('en')}
                >
                  🇬🇧 English
                </button>
                <button
                  className={`language-btn ${language === 'id' ? 'active' : ''}`}
                  onClick={() => setLanguage('id')}
                >
                  🇮🇩 Bahasa Indonesia
                </button>
              </div>
            </div>

            <div className="settings-section">
              <h3>{t('profile.wallet')}</h3>
              <div className="wallet-section">
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
                  <p className="toggle-description">
                    {useNonCryptoMode
                      ? 'You are earning game credits instead of blockchain tokens'
                      : 'You are earning blockchain tokens (SMT)'}
                  </p>
                </div>

                {!useNonCryptoMode && (
                  <div className="wallet-connection" style={{ marginTop: '20px', textAlign: 'center' }}>
                    <w3m-button size="lg" label="Connect Wallet" />
                  </div>
                )}

                {tokenBalance && !useNonCryptoMode && (
                  <p className="wallet-balance" style={{ textAlign: 'center', marginTop: '10px' }}>
                    Balance: {parseFloat(tokenBalance ?? '0').toFixed(2)} SMT
                  </p>
                )}
              </div>
            </div>

            <div className="settings-section">
              <h3>About</h3>
              <p className="about-text">
                Smartour v1.0.0 - Explore Indonesia, Earn Rewards
              </p>
              <p className="about-text">
                A Telegram Mini App for discovering Indonesia's amazing destinations
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;