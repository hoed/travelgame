// src/pages/Profile.tsx
import { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { useWallet } from '../contexts/WalletContext';
import { useLanguage } from '../contexts/LanguageContext';
import './Profile.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'w3m-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const Profile = () => {
  const { userStats } = useGame();
  const { tokenBalance, useNonCryptoMode, toggleNonCryptoMode } = useWallet();
  const { t, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<'stats' | 'settings'>('stats');

  const userName = window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'Explorer';

  return (
    <div className="profile-container">
      {/* Your beautiful header here — keep it exactly as you had */}
      {/* ... header code ... */}

      <div className="profile-tabs">
        <button className={activeTab === 'stats' ? 'active' : ''} onClick={() => setActiveTab('stats')}>
          Stats
        </button>
        <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
          Settings
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'settings' && (
          <div className="settings-tab">
            <div className="settings-section">
              <h3>Language</h3>
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
              <h3>Wallet</h3>
              <div className="wallet-section">
                <label className="toggle-label">
                  <input type="checkbox" checked={useNonCryptoMode} onChange={toggleNonCryptoMode} />
                  <span className="toggle-slider" />
                  <span>Non-Crypto Mode</span>
                </label>

                {!useNonCryptoMode && (
                  <div style={{ margin: '30px 0', textAlign: 'center' }}>
                    <w3m-button size="lg" />
                  </div>
                )}

                {tokenBalance && !useNonCryptoMode && (
                  <p style={{ textAlign: 'center', fontSize: '20px', marginTop: '20px' }}>
                    Balance: {Number(tokenBalance).toFixed(2)} SMT
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