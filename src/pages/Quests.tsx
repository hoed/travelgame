import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { useLanguage } from '../contexts/LanguageContext';
import './Quests.css';

const Quests = () => {
    const { quests, currentRegion, setCurrentRegion } = useGame();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [sortBy, setSortBy] = useState<'distance' | 'reward' | 'difficulty'>('distance');

    const filteredQuests = quests.filter((quest) => {
        if (filter === 'active') return !quest.completed;
        if (filter === 'completed') return quest.completed;
        return true;
    });

    const sortedQuests = [...filteredQuests].sort((a, b) => {
        if (sortBy === 'distance') {
            return (a.distance || Infinity) - (b.distance || Infinity);
        }
        if (sortBy === 'reward') {
            return b.reward - a.reward;
        }
        if (sortBy === 'difficulty') {
            const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
            return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        }
        return 0;
    });

    const activeCount = quests.filter((q) => !q.completed).length;
    const completedCount = quests.filter((q) => q.completed).length;

    return (
        <div className="quests-container">
            <header className="quests-header">
                <h1>{t('nav.quests')}</h1>
                <div className="quest-stats">
                    <span>{activeCount} Active</span>
                    <span>{completedCount} Completed</span>
                </div>
            </header>

            <div className="quests-controls">
                <div className="region-selector">
                    <label htmlFor="region-select">Region:</label>
                    <select
                        id="region-select"
                        className="region-select"
                        value={currentRegion}
                        onChange={(e) => setCurrentRegion(e.target.value)}
                    >
                        <option value="sumatra">Sumatra</option>
                        <option value="java">Java</option>
                        <option value="bali">Bali</option>
                        <option value="kalimantan">Kalimantan</option>
                        <option value="sulawesi">Sulawesi</option>
                        <option value="nusa-tenggara">Nusa Tenggara</option>
                        <option value="maluku">Maluku</option>
                        <option value="papua">Papua</option>
                    </select>
                </div>

                <div className="filter-buttons">
                    <button
                        className={filter === 'all' ? 'active' : ''}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={filter === 'active' ? 'active' : ''}
                        onClick={() => setFilter('active')}
                    >
                        Active
                    </button>
                    <button
                        className={filter === 'completed' ? 'active' : ''}
                        onClick={() => setFilter('completed')}
                    >
                        Completed
                    </button>
                </div>

                <select
                    className="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                >
                    <option value="distance">Nearest</option>
                    <option value="reward">Highest Reward</option>
                    <option value="difficulty">Difficulty</option>
                </select>
            </div>

            <div className="quests-list">
                {sortedQuests.map((quest) => (
                    <div
                        key={quest.id}
                        className={`quest-card ${quest.completed ? 'completed' : ''}`}
                        onClick={() => navigate(`/quests/${quest.id}`)}
                    >
                        <div className="quest-card-header">
                            <div className="quest-title-section">
                                <h3>{t(quest.titleId)}</h3>
                                <p className="quest-location">📍 {quest.location.name}</p>
                            </div>
                            <div className="quest-reward-badge">
                                <span className="reward-amount">+{quest.reward}</span>
                                <span className="reward-label">SMT</span>
                            </div>
                        </div>

                        <p className="quest-description">{t(quest.descriptionId)}</p>

                        <div className="quest-card-footer">
                            <div className="quest-meta">
                                <span className={`difficulty-badge ${quest.difficulty}`}>
                                    {t(`quest.difficulty.${quest.difficulty}`)}
                                </span>
                                <span className="type-badge">{t(`quest.type.${quest.type}`)}</span>
                                {quest.distance !== undefined && (
                                    <span className="distance-badge">
                                        {quest.distance.toFixed(1)} km
                                    </span>
                                )}
                            </div>

                            {quest.completed ? (
                                <span className="completed-badge">✓ {t('quest.completed')}</span>
                            ) : (
                                <button className="start-quest-btn">
                                    {t('quest.start')} →
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {sortedQuests.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">🎯</div>
                    <h3>No quests found</h3>
                    <p>Try changing your filters</p>
                </div>
            )}
        </div>
    );
};

export default Quests;
