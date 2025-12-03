import { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { useWallet } from '../contexts/WalletContext';
import { useLanguage } from '../contexts/LanguageContext';
import './Profile.css';

const Profile = () => {
    const { userStats, achievements } = useGame();
    const { address, tokenBalance, isConnected, connectWallet, disconnectWallet, useNonCryptoMode, toggleNonCryptoMode } = useWallet();
    const { t, language, setLanguage } = useLanguage();
    const [activeTab, setActiveTab] = useState<'stats' | 'achievements' | 'settings'>('stats');

    const userName = window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'Explorer';
    const userPhoto = window.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url;

    const unlockedAchievements = achievements.filter((a) => a.unlocked);
    const lockedAchievements = achievements.filter((a) => !a.unlocked);

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
                </div>
                <h1>{userName}</h1>
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
                                            : tokenBalance}
                                    </span>
                                    <span className="stat-label">
                                        {useNonCryptoMode ? 'Game Credits' : 'TOUR Tokens'}
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
                                            : 'You are earning blockchain tokens (TOUR)'}
                                    </p>
                                </div>

                                {!useNonCryptoMode && (
                                    <div className="wallet-connection">
                                        {isConnected ? (
                                            <div className="wallet-connected">
                                                <p className="wallet-address">
                                                    {address?.slice(0, 6)}...{address?.slice(-4)}
                                                </p>
                                                <p className="wallet-balance">
                                                    {tokenBalance} TOUR
                                                </p>
                                                <button
                                                    className="btn-secondary"
                                                    onClick={disconnectWallet}
                                                >
                                                    {t('wallet.disconnect')}
                                                </button>
                                            </div>
                                        ) : (
                                            <button className="btn-primary" onClick={connectWallet}>
                                                {t('wallet.connect')}
                                            </button>
                                        )}
                                    </div>
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
