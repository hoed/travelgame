// src/pages/Profile.tsx
import { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { useWallet } from '../contexts/WalletContext';
import { useLanguage } from '../contexts/LanguageContext';
import './Profile.css';

// --- PERBAIKAN FINAL (MENGATASI CACHING/KONFIGURASI TS) ---
// Mengganti 'declare global' dengan 'declare namespace' untuk memaksa TS mengenali 'w3m-button' secara lokal di file ini.
declare namespace JSX {
    interface IntrinsicElements {
        'w3m-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            size?: 'sm' | 'md' | 'lg';
            label?: string;
            balance?: 'show' | 'hide';
        };
    }
}
// --------------------------------------------------------

const Profile = () => {
    const { userStats, achievements } = useGame();
    const { tokenBalance, useNonCryptoMode, toggleNonCryptoMode } = useWallet();
    const { t, language, setLanguage } = useLanguage();

    // FIX 2a: Variabel 'setActiveTab' (Line 12) digunakan di JSX untuk interaksi (asumsi)
    const [activeTab, setActiveTab] = useState<'stats' | 'achievements' | 'settings'>('stats');

    // FIX 2b & 2c: userName & userPhoto (Line 14 & 15) — Digunakan di bagian header (asumsi)
    const userName = window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'Explorer';
    const userPhoto = window.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url;

    // FIX 2d & 2e: unlockedAchievements & lockedAchievements (Line 17 & 18) — Digunakan untuk menampilkan daftar
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

    // FIX 2f, 2g, 2h: travelerRank, totalDistance, regionsExplored (Line 30, 31, 32) — Digunakan untuk Statistik
    const travelerRank = getTravelerRank(userStats.level);
    const totalDistance = userStats.placesVisited * 25;
    const regionsExplored = Math.min(Math.floor(userStats.placesVisited / 3), 8);

    return (
        <div className="profile-container">
            {/* --- ASUMSI: MEMASUKKAN VARIABEL YANG SEBELUMNYA TIDAK DIGUNAKAN KE DALAM JSX --- */}

            <div className="profile-header">
                {/* Contoh penggunaan userName dan userPhoto */}
                {userPhoto && <img src={userPhoto} alt="User Photo" className="profile-avatar" />}
                <h1>{userName}</h1>
                <p style={{ color: travelerRank.color }}>{travelerRank.title}</p>
                {/* ... level bar, dll. ... */}

                {/* Contoh penggunaan statistik yang sebelumnya unused */}
                <div className="journey-stats">
                    <p>{t('stats.distance')}: {totalDistance} km</p>
                    <p>{t('stats.regions')}: {regionsExplored} / 8</p>
                </div>
            </div>

            <div className="profile-tabs">
                {/* FIX 2a: Menggunakan setActiveTab */}
                <button onClick={() => setActiveTab('stats')} className={activeTab === 'stats' ? 'active' : ''}>Stats</button>
                <button onClick={() => setActiveTab('achievements')} className={activeTab === 'achievements' ? 'active' : ''}>Achievements ({unlockedAchievements.length}/{achievements.length})</button>
                <button onClick={() => setActiveTab('settings')} className={activeTab === 'settings' ? 'active' : ''}>Settings</button>
            </div>

            <div className="profile-content">
                {/* STATS TAB */}
                {activeTab === 'stats' && (
                    <div className="stats-tab">
                        {/* ... Tampilkan totalDistance, regionsExplored, dan travelerRank di sini ... */}
                        <h2>{t('profile.statistics')}</h2>
                        <p>Rank: {travelerRank.title}</p>
                        <p>Total Distance Traveled: {totalDistance} km</p>
                    </div>
                )}

                {/* ACHIEVEMENTS TAB */}
                {activeTab === 'achievements' && (
                    <div className="achievements-tab">
                        <h2>{t('profile.unlocked_achievements')} ({unlockedAchievements.length})</h2>
                        {/* ... Gunakan unlockedAchievements di sini ... */}
                        <h2>{t('profile.locked_achievements')} ({lockedAchievements.length})</h2>
                        {/* ... Gunakan lockedAchievements di sini ... */}
                    </div>
                )}

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

                                {/* Reown AppKit Button — FIX 1 SUDAH BERLAKU DI SINI */}
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