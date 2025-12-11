// src/pages/Profile.tsx
import { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { useWallet } from '../contexts/WalletContext';
import { useLanguage } from '../contexts/LanguageContext';
import './Profile.css';

// Type declaration for Reown AppKit's <w3m-button /> (no import needed)
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
  const { userStats } = useGame(); // Used now
  const { tokenBalance, useNonCryptoMode, toggleNonCryptoMode } = useWallet(); // Used
  const { t, language, setLanguage } = useLanguage(); // Used
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements' | 'settings'>('stats');

  const userName = window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'Explorer';
  const userPhoto = window.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url;

  return (
    <div className="profile-container">
      {/* Your header, tabs, stats, achievements — keep them as-is */}
      {/* ... (your beautiful header code) ... */}

      {activeTab === 'settings' && (
        <div className="settings-tab">
          {/* Language */}
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

          {/* Wallet */}
          <div className="settings-section">
            <h3>{t('profile.wallet')}</h3>
            <div className="wallet-section">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={useNonCryptoMode}
                  onChange={toggleNonCryptoMode}
                />
                <span className="toggle-slider" />
                <span>{t('wallet.non_crypto_mode')}</span>
              </label>

              {!useNonCryptoMode && (
                <div style={{ margin: '20px 0', textAlign: 'center' }}>
                  <w3m-button size="lg" />
                </div>
              )}

              {tokenBalance && !useNonCryptoMode && (
                <p style={{ textAlign: 'center', marginTop: '10px' }}>
                  Balance: {parseFloat(tokenBalance).toFixed(2)} SMT
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;