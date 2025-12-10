import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { useWallet } from '../contexts/WalletContext';
import { useLanguage } from '../contexts/LanguageContext';
import CartoonCharacter from '../components/CartoonCharacter';
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
            {/* Floating Particles Background */}
            <div className="floating-particles">
                {[...Array(15)].map((_, i) => (
                    <div key={i} className={`particle particle-${i}`}></div>
                ))}
            </div>

            <header className="home-header">
                <div className="header-content">
                    <div className="greeting">
                        <div className="greeting-mascot">
                            <CartoonCharacter type="explorer" size="small" />
                        </div>
                        <div className="greeting-text">
                            <span className="welcome-badge">🚀 Welcome Back</span>
                            <h1>{t('home.greeting').replace('Explorer', userName)}</h1>
                            <div className="streak">
                                <span className="streak-icon">🔥</span>
                                <span className="streak-count">{userStats.streak}</span>
                                <span className="streak-label">day streak</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="stats-grid">
                <div className="stat-card level-card">
                    <div className="stat-glow"></div>
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
                    <div className="xp-text">{userStats.xp}/{userStats.xpToNextLevel} XP</div>
                </div>

                <div className="stat-card token-card">
                    <div className="stat-glow pink"></div>
                    <div className="stat-icon">💎</div>
                    <div className="stat-value">
                        {useNonCryptoMode
                            ? localStorage.getItem('gameCredits') || '0'
                            : tokenBalance}
                    </div>
                    <div className="stat-label">{t('home.stats.tokens')}</div>
                    <div className="token-badge">SMT</div>
                </div>

                <div className="stat-card places-card">
                    <div className="stat-glow cyan"></div>
                    <div className="stat-icon">📍</div>
                    <div className="stat-value">{userStats.placesVisited}</div>
                    <div className="stat-label">{t('home.stats.places')}</div>
                </div>

                <div className="stat-card quests-card">
                    <div className="stat-glow yellow"></div>
                    <div className="stat-icon">🎯</div>
                    <div className="stat-value">{userStats.questsCompleted}</div>
                    <div className="stat-label">{t('home.stats.quests')}</div>
                </div>
            </div>

            {dailyQuest && (
                <section className="daily-quest-section">
                    <div className="section-title">
                        <span className="title-icon">⚡</span>
                        <h2>{t('home.daily_quest')}</h2>
                        <span className="title-badge">HOT</span>
                    </div>
                    <div
                        className="daily-quest-card"
                        onClick={() => navigate(`/quests/${dailyQuest.id}`)}
                    >
                        <div className="quest-card-bg"></div>
                        <div className="quest-mascot">
                            <CartoonCharacter type="flying" size="small" />
                        </div>
                        <div className="quest-content">
                            <div className="quest-header">
                                <h3>{t(dailyQuest.titleId)}</h3>
                                <span className="quest-reward">
                                    <span className="reward-icon">💎</span>
                                    +{dailyQuest.reward} SMT
                                </span>
                            </div>
                            <p className="quest-description">{t(dailyQuest.descriptionId)}</p>
                            <div className="quest-meta">
                                <span className={`difficulty ${dailyQuest.difficulty}`}>
                                    {dailyQuest.difficulty === 'easy' && '🟢'}
                                    {dailyQuest.difficulty === 'medium' && '🟡'}
                                    {dailyQuest.difficulty === 'hard' && '🔴'}
                                    {t(`quest.difficulty.${dailyQuest.difficulty}`)}
                                </span>
                                <span className="quest-type">
                                    {dailyQuest.type === 'visit' && '📍'}
                                    {dailyQuest.type === 'photo' && '📸'}
                                    {dailyQuest.type === 'challenge' && '⚡'}
                                    {dailyQuest.type === 'social' && '🌐'}
                                    {t(`quest.type.${dailyQuest.type}`)}
                                </span>
                            </div>
                        </div>
                        <div className="quest-arrow">→</div>
                    </div>
                </section>
            )}

            <section className="nearby-section">
                <div className="section-header">
                    <div className="section-title">
                        <span className="title-icon">🗺️</span>
                        <h2>{t('home.nearby_places')}</h2>
                    </div>
                    <button onClick={() => navigate('/map')} className="view-all-btn">
                        <span>View Map</span>
                        <span className="btn-arrow">→</span>
                    </button>
                </div>
                <div className="nearby-list">
                    {nearbyQuests.map((quest, index) => (
                        <div
                            key={quest.id}
                            className={`nearby-card card-${index}`}
                            onClick={() => navigate(`/quests/${quest.id}`)}
                        >
                            <div className="card-glow"></div>
                            <div className="nearby-icon">
                                {quest.type === 'visit' && '🏛️'}
                                {quest.type === 'photo' && '📸'}
                                {quest.type === 'challenge' && '⚡'}
                                {quest.type === 'social' && '🌐'}
                            </div>
                            <div className="nearby-info">
                                <h3>{t(quest.titleId)}</h3>
                                <p className="location-name">{quest.location.name}</p>
                                <div className="nearby-meta">
                                    <span className="distance">
                                        <span className="distance-icon">📍</span>
                                        {quest.distance?.toFixed(1)} km
                                    </span>
                                    <span className={`difficulty-badge ${quest.difficulty}`}>
                                        {quest.difficulty}
                                    </span>
                                </div>
                            </div>
                            <div className="nearby-reward">
                                <span className="reward-amount">+{quest.reward}</span>
                                <span className="reward-token">SMT</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Destinations Section */}
            <section className="featured-section">
                <div className="section-title">
                    <span className="title-icon">🌟</span>
                    <h2>Featured Destinations</h2>
                    <span className="title-badge new">NEW</span>
                </div>
                <div className="featured-scroll">
                    <div className="featured-card bali">
                        <div className="featured-image">
                            <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80" alt="Bali" />
                            <div className="featured-overlay"></div>
                        </div>
                        <div className="featured-content">
                            <span className="featured-badge">🏝️ Island Paradise</span>
                            <h3>Bali Adventures</h3>
                            <p>12 Quests Available</p>
                            <div className="featured-rewards">
                                <span>💎 Up to 300 SMT</span>
                            </div>
                        </div>
                    </div>
                    <div className="featured-card java">
                        <div className="featured-image">
                            <img src="https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=400&q=80" alt="Borobudur" />
                            <div className="featured-overlay"></div>
                        </div>
                        <div className="featured-content">
                            <span className="featured-badge">🏛️ Ancient Wonders</span>
                            <h3>Java Heritage</h3>
                            <p>30 Quests Available</p>
                            <div className="featured-rewards">
                                <span>💎 Up to 250 SMT</span>
                            </div>
                        </div>
                    </div>
                    <div className="featured-card raja-ampat">
                        <div className="featured-image">
                            <img src="https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=400&q=80" alt="Raja Ampat" />
                            <div className="featured-overlay"></div>
                        </div>
                        <div className="featured-content">
                            <span className="featured-badge">🐠 Marine Paradise</span>
                            <h3>Raja Ampat</h3>
                            <p>8 Quests Available</p>
                            <div className="featured-rewards">
                                <span>💎 Up to 350 SMT</span>
                            </div>
                        </div>
                    </div>
                    <div className="featured-card komodo">
                        <div className="featured-image">
                            <img src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=400&q=80" alt="Komodo" />
                            <div className="featured-overlay"></div>
                        </div>
                        <div className="featured-content">
                            <span className="featured-badge">🦎 Dragon Territory</span>
                            <h3>Komodo Island</h3>
                            <p>6 Quests Available</p>
                            <div className="featured-rewards">
                                <span>💎 Up to 280 SMT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {recentAchievements.length > 0 && (
                <section className="achievements-section">
                    <div className="section-header">
                        <div className="section-title">
                            <span className="title-icon">🏆</span>
                            <h2>{t('home.achievements')}</h2>
                        </div>
                        <button onClick={() => navigate('/profile')} className="view-all-btn">
                            <span>View All</span>
                            <span className="btn-arrow">→</span>
                        </button>
                    </div>
                    <div className="achievements-list">
                        {recentAchievements.map((achievement) => (
                            <div key={achievement.id} className="achievement-card">
                                <div className="achievement-glow"></div>
                                <div className="achievement-icon">{achievement.icon}</div>
                                <div className="achievement-info">
                                    <h4>{t(achievement.nameId)}</h4>
                                    <p>{t(achievement.descriptionId)}</p>
                                </div>
                                <div className="achievement-badge">✓</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Mascot Guide Section */}
            <section className="guide-section">
                <div className="guide-card">
                    <div className="guide-mascot">
                        <CartoonCharacter type="guide" size="large" />
                        <div className="guide-message">
                            <p>Ready for your next adventure? Let's explore Indonesia together!</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
