import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useGame } from '../contexts/GameContext';
import './Leaderboard.css';

interface LeaderboardEntry {
    rank: number;
    userId: string;
    name: string;
    avatar?: string;
    score: number;
    level: number;
    questsCompleted: number;
}

const Leaderboard = () => {
    const { t } = useLanguage();
    const { userStats } = useGame();
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
    const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'all-time'>('weekly');
    const [loading, setLoading] = useState(true);

    const currentUserId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || 'user';

    useEffect(() => {
        loadLeaderboard();
    }, [timeframe]);

    const loadLeaderboard = async () => {
        setLoading(true);

        // Simulate API call - in production, this would fetch from backend
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock leaderboard data
        const mockData: LeaderboardEntry[] = [
            {
                rank: 1,
                userId: 'user1',
                name: 'Budi Santoso',
                score: 2450,
                level: 15,
                questsCompleted: 45,
            },
            {
                rank: 2,
                userId: 'user2',
                name: 'Sarah Johnson',
                score: 2180,
                level: 14,
                questsCompleted: 38,
            },
            {
                rank: 3,
                userId: 'user3',
                name: 'Ahmad Rizki',
                score: 1920,
                level: 12,
                questsCompleted: 32,
            },
            {
                rank: 4,
                userId: 'user4',
                name: 'Lisa Chen',
                score: 1750,
                level: 11,
                questsCompleted: 28,
            },
            {
                rank: 5,
                userId: 'user5',
                name: 'Dimas Pratama',
                score: 1580,
                level: 10,
                questsCompleted: 25,
            },
            {
                rank: 6,
                userId: currentUserId,
                name: window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'You',
                score: userStats.tokensEarned,
                level: userStats.level,
                questsCompleted: userStats.questsCompleted,
            },
        ];

        setLeaderboardData(mockData);
        setLoading(false);
    };

    const getRankMedal = (rank: number) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return `#${rank}`;
    };

    return (
        <div className="leaderboard-container">
            <header className="leaderboard-header">
                <h1>{t('leaderboard.title')}</h1>
            </header>

            <div className="timeframe-selector">
                <button
                    className={timeframe === 'daily' ? 'active' : ''}
                    onClick={() => setTimeframe('daily')}
                >
                    Daily
                </button>
                <button
                    className={timeframe === 'weekly' ? 'active' : ''}
                    onClick={() => setTimeframe('weekly')}
                >
                    Weekly
                </button>
                <button
                    className={timeframe === 'all-time' ? 'active' : ''}
                    onClick={() => setTimeframe('all-time')}
                >
                    All Time
                </button>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="spinner-large" />
                    <p>{t('common.loading')}</p>
                </div>
            ) : (
                <div className="leaderboard-list">
                    {leaderboardData.map((entry) => (
                        <div
                            key={entry.userId}
                            className={`leaderboard-entry ${entry.userId === currentUserId ? 'current-user' : ''
                                } ${entry.rank <= 3 ? 'top-three' : ''}`}
                        >
                            <div className="entry-rank">
                                <span className="rank-badge">{getRankMedal(entry.rank)}</span>
                            </div>

                            <div className="entry-avatar">
                                {entry.avatar ? (
                                    <img src={entry.avatar} alt={entry.name} />
                                ) : (
                                    <div className="avatar-placeholder">
                                        {entry.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            <div className="entry-info">
                                <div className="entry-name">
                                    {entry.name}
                                    {entry.userId === currentUserId && (
                                        <span className="you-badge">You</span>
                                    )}
                                </div>
                                <div className="entry-meta">
                                    <span>Level {entry.level}</span>
                                    <span>•</span>
                                    <span>{entry.questsCompleted} quests</span>
                                </div>
                            </div>

                            <div className="entry-score">
                                <span className="score-value">{entry.score.toLocaleString()}</span>
                                <span className="score-label">points</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="leaderboard-footer">
                <p className="footer-text">
                    Rankings update every hour. Keep exploring to climb the leaderboard!
                </p>
            </div>
        </div>
    );
};

export default Leaderboard;
