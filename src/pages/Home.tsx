import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { useWallet } from '../contexts/WalletContext';
import { useLanguage } from '../contexts/LanguageContext';
import './Home.css';

const Home = () => {
    const { userStats, quests, achievements } = useGame();
    const { tokenBalance, useNonCryptoMode } = useWallet();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('Explorer');

    useEffect(() => {
        // Get Telegram user info
        const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
        if (tgUser) {
            setUserName(tgUser.first_name || 'Explorer');
        }
    }, []);

    const nearbyQuests = quests
        .filter((q) => !q.completed && q.distance !== undefined)
        .sort((a, b) => (a.distance || 0) - (b.distance || 0))
        .slice(0, 3);

    const recentAchievements = achievements
        .filter((a) => a.unlocked)
        .sort((a, b) => {
            if (!a.unlockedAt || !b.unlockedAt) return 0;
            return b.unlockedAt.getTime() - a.unlockedAt.getTime();
        })
        .slice(0, 3);

    const dailyQuest = quests.find((q) => !q.completed);

    return (
        <div className="home-container">
            <header className="home-header">
                <div className="greeting">
                    <h1>{t('home.greeting').replace('Explorer', userName)}</h1>
                    <div className="streak">🔥 {userStats.streak} day streak</div>
                </div>
            </header>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">⭐</div>
                    <div className="stat-value">{userStats.level}</div>
                    <div className="stat-label">{t('home.stats.level')}</div>
                    <div className="stat-progress">
                        <div
                            className="progress-bar"
                            style={{
                                width: `${(userStats.xp / userStats.xpToNextLevel) * 100}%`,
                            }}
                        />
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-value">
                        {useNonCryptoMode
                            ? localStorage.getItem('gameCredits') || '0'
                            : tokenBalance}
                    </div>
                    <div className="stat-label">{t('home.stats.tokens')}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">📍</div>
                    <div className="stat-value">{userStats.placesVisited}</div>
                    <div className="stat-label">{t('home.stats.places')}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">🎯</div>
                    <div className="stat-value">{userStats.questsCompleted}</div>
                    <div className="stat-label">{t('home.stats.quests')}</div>
                </div>
            </div>

            {dailyQuest && (
                <section className="daily-quest-section">
                    <h2>{t('home.daily_quest')}</h2>
                    <div
                        className="daily-quest-card"
                        onClick={() => navigate(`/quests/${dailyQuest.id}`)}
                    >
                        <div className="quest-header">
                            <h3>{t(dailyQuest.titleId)}</h3>
                            <span className="quest-reward">+{dailyQuest.reward} TOUR</span>
                        </div>
                        <p>{t(dailyQuest.descriptionId)}</p>
                        <div className="quest-meta">
                            <span className={`difficulty ${dailyQuest.difficulty}`}>
                                {t(`quest.difficulty.${dailyQuest.difficulty}`)}
                            </span>
                            <span className="quest-type">
                                {t(`quest.type.${dailyQuest.type}`)}
                            </span>
                        </div>
                    </div>
                </section>
            )}

            <section className="nearby-section">
                <div className="section-header">
                    <h2>{t('home.nearby_places')}</h2>
                    <button onClick={() => navigate('/map')} className="view-all-btn">
                        View Map →
                    </button>
                </div>
                <div className="nearby-list">
                    {nearbyQuests.map((quest) => (
                        <div
                            key={quest.id}
                            className="nearby-card"
                            onClick={() => navigate(`/quests/${quest.id}`)}
                        >
                            <div className="nearby-info">
                                <h3>{t(quest.titleId)}</h3>
                                <p className="location-name">{quest.location.name}</p>
                                <span className="distance">
                                    📍 {quest.distance?.toFixed(1)} km
                                </span>
                            </div>
                            <div className="nearby-reward">+{quest.reward}</div>
                        </div>
                    ))}
                </div>
            </section>

            {recentAchievements.length > 0 && (
                <section className="achievements-section">
                    <div className="section-header">
                        <h2>{t('home.achievements')}</h2>
                        <button onClick={() => navigate('/profile')} className="view-all-btn">
                            View All →
                        </button>
                    </div>
                    <div className="achievements-list">
                        {recentAchievements.map((achievement) => (
                            <div key={achievement.id} className="achievement-card">
                                <div className="achievement-icon">{achievement.icon}</div>
                                <div className="achievement-info">
                                    <h4>{t(achievement.nameId)}</h4>
                                    <p>{t(achievement.descriptionId)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;
