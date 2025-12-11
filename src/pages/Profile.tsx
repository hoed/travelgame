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
    level >= 50 ? { title: 'Legendary Explorer', color: '#FFD700' } :
    level >= 40 ? { title: 'Master Traveler', color: '#E5E4E2' } :
    level >= 30 ? { title: 'Expert Navigator', color: '#CD7CD7F32' } :
    level >= 20 ? { title: 'Seasoned Adventurer', color: '#4169E1' } :
    level >= 10 ? { title: 'Experienced Backpacker', color: '#32CD32' } :
    level >= 5 ? { title: 'Active Wanderer', color: '#FF6347' } :
    { title: 'Novice Explorer', color: '#9370DB' };

  const travelerRank = getTravelerRank(userStats.level);
  const totalDistance = userStats.placesVisited * 25;
  const regionsExplored = Math.min(Math.floor(userStats.placesVisited / 3), 8);

  return (
    <div className="profile-container">
      {/* ... your beautiful header stays exactly the same ... */}

      <div className="profile-content">
        {/* Stats & Achievements tabs stay the same ... */}

        {activeTab === 'settings' && (
          <div className="settings-tab">
            <div className="settings-section">
              <h3>{t('profile.language')}</h3>
              <div className="language-options">
                <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>
                  English
                </button>
                <button className={language === 'id' ? 'active' : ''} onClick={() => setLanguage('id')}>
                  Bahasa Indonesia
                </button>
              </div>
            </div>

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

                {/* REOWN APPKIT BUTTON — NO IMPORT NEEDED */}
                {!useNonCryptoMode && (
                  <div className="wallet-connection">
                    <w3m-button size="lg" label="Connect Wallet" balance="show" />
                  </div>
                )}

                {tokenBalance && !useNonCryptoMode && (
                  <p className="wallet-balance">
                    Balance: {parseFloat(tokenBalance).toFixed(2)} SMT
                  </p>
                )}
              </div>
            </div>

            {/* About section stays the same */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;