import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { useLanguage } from '../contexts/LanguageContext';
import './QuestDetail.css';

const QuestDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { quests } = useGame();
    const { t } = useLanguage();
    const navigate = useNavigate();

    const quest = quests.find((q) => q.id === id);

    if (!quest) {
        return (
            <div className="quest-detail-container">
                <div className="error-state">
                    <h2>Quest not found</h2>
                    <button onClick={() => navigate('/quests')}>Back to Quests</button>
                </div>
            </div>
        );
    }

    const handleStartQuest = () => {
        if (quest.completed) return;
        navigate(`/check-in/${quest.id}`);
    };

    const handleViewOnMap = () => {
        navigate('/map');
    };

    return (
        <div className="quest-detail-container">
            <button className="back-button" onClick={() => navigate('/quests')}>
                ← Back
            </button>

            <div className="quest-detail-header">
                <div className="quest-type-icon">
                    {quest.type === 'visit' && '📍'}
                    {quest.type === 'photo' && '📸'}
                    {quest.type === 'challenge' && '⚡'}
                    {quest.type === 'social' && '🌐'}
                </div>
                <h1>{t(quest.titleId)}</h1>
                <p className="quest-location-name">{quest.location.name}</p>
            </div>

            <div className="quest-detail-content">
                <section className="quest-description-section">
                    <h2>Description</h2>
                    <p>{t(quest.descriptionId)}</p>
                </section>

                <section className="quest-info-section">
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Reward</span>
                            <span className="info-value">+{quest.reward} SMT</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Difficulty</span>
                            <span className={`info-value difficulty-${quest.difficulty}`}>
                                {t(`quest.difficulty.${quest.difficulty}`)}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Type</span>
                            <span className="info-value">{t(`quest.type.${quest.type}`)}</span>
                        </div>
                        {quest.distance !== undefined && (
                            <div className="info-item">
                                <span className="info-label">Distance</span>
                                <span className="info-value">{quest.distance.toFixed(1)} km</span>
                            </div>
                        )}
                    </div>
                </section>

                <section className="quest-requirements-section">
                    <h2>Requirements</h2>
                    <ul className="requirements-list">
                        {quest.type === 'visit' && (
                            <li>✓ Visit the location and check in within 100m radius</li>
                        )}
                        {quest.type === 'photo' && (
                            <>
                                <li>✓ Visit the location</li>
                                <li>✓ Take a photo at the site</li>
                            </>
                        )}
                        {quest.type === 'challenge' && (
                            <>
                                <li>✓ Complete the challenge at the location</li>
                                <li>✓ Submit proof of completion</li>
                            </>
                        )}
                        {quest.type === 'social' && (
                            <>
                                <li>✓ Visit the location</li>
                                <li>✓ Share your experience on social media</li>
                            </>
                        )}
                    </ul>
                </section>

                <section className="quest-tips-section">
                    <h2>Tips</h2>
                    <div className="tips-list">
                        <div className="tip-item">
                            <span className="tip-icon">💡</span>
                            <p>Make sure your GPS is enabled for accurate check-in</p>
                        </div>
                        <div className="tip-item">
                            <span className="tip-icon">🕐</span>
                            <p>Best time to visit: Early morning or late afternoon</p>
                        </div>
                        <div className="tip-item">
                            <span className="tip-icon">📱</span>
                            <p>Don't forget to bring your phone for photos!</p>
                        </div>
                    </div>
                </section>
            </div>

            <div className="quest-detail-actions">
                <button className="btn-secondary" onClick={handleViewOnMap}>
                    View on Map
                </button>
                <button
                    className="btn-primary"
                    onClick={handleStartQuest}
                    disabled={quest.completed}
                >
                    {quest.completed ? t('quest.completed') : t('quest.start')}
                </button>
            </div>
        </div>
    );
};

export default QuestDetail;
