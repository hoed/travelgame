import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { useLanguage } from '../contexts/LanguageContext';
import './CheckIn.css';

const CheckIn = () => {
    const { locationId } = useParams<{ locationId: string }>();
    const { quests, checkInLocation, completeQuest } = useGame();
    const { t } = useLanguage();
    const navigate = useNavigate();

    const [isChecking, setIsChecking] = useState(false);
    const [checkInStatus, setCheckInStatus] = useState<'idle' | 'success' | 'failed'>('idle');
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [distance, setDistance] = useState<number | null>(null);

    const quest = quests.find((q) => q.id === locationId);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setUserLocation({ lat, lng });

                    if (quest) {
                        const dist = calculateDistance(
                            lat,
                            lng,
                            quest.location.lat,
                            quest.location.lng
                        );
                        setDistance(dist);
                    }
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        }
    }, [quest]);

    const calculateDistance = (
        lat1: number,
        lng1: number,
        lat2: number,
        lng2: number
    ): number => {
        const R = 6371; // Earth's radius in km
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLng = ((lng2 - lng1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const handleCheckIn = async () => {
        if (!userLocation || !quest) return;

        setIsChecking(true);

        // Simulate verification delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const success = await checkInLocation(
            quest.id,
            userLocation.lat,
            userLocation.lng
        );

        if (success) {
            setCheckInStatus('success');
            completeQuest(quest.id);

            // Navigate back after success
            setTimeout(() => {
                navigate('/quests');
            }, 2000);
        } else {
            setCheckInStatus('failed');
        }

        setIsChecking(false);
    };

    if (!quest) {
        return (
            <div className="checkin-container">
                <div className="error-state">
                    <h2>Location not found</h2>
                    <button onClick={() => navigate('/quests')}>Back to Quests</button>
                </div>
            </div>
        );
    }

    const isWithinRange = distance !== null && distance <= 0.1;

    return (
        <div className="checkin-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="checkin-content">
                <div className="location-icon">📍</div>
                <h1>{t(quest.titleId)}</h1>
                <p className="location-name">{quest.location.name}</p>

                {checkInStatus === 'idle' && (
                    <>
                        <div className="distance-indicator">
                            {distance !== null ? (
                                <>
                                    <div className={`distance-circle ${isWithinRange ? 'in-range' : 'out-of-range'}`}>
                                        <span className="distance-value">
                                            {distance < 1
                                                ? `${(distance * 1000).toFixed(0)}m`
                                                : `${distance.toFixed(1)}km`}
                                        </span>
                                        <span className="distance-label">away</span>
                                    </div>
                                    {isWithinRange ? (
                                        <p className="status-message success">
                                            ✓ You're in range! Ready to check in.
                                        </p>
                                    ) : (
                                        <p className="status-message warning">
                                            ⚠ You need to be within 100m to check in
                                        </p>
                                    )}
                                </>
                            ) : (
                                <div className="loading-location">
                                    <div className="spinner" />
                                    <p>Getting your location...</p>
                                </div>
                            )}
                        </div>

                        <div className="checkin-info">
                            <h3>Check-in Instructions</h3>
                            <ul>
                                <li>Make sure you're at the location</li>
                                <li>Enable GPS for accurate positioning</li>
                                <li>You must be within 100 meters</li>
                            </ul>
                        </div>

                        <button
                            className="btn-primary checkin-button"
                            onClick={handleCheckIn}
                            disabled={!isWithinRange || isChecking}
                        >
                            {isChecking ? (
                                <>
                                    <div className="button-spinner" />
                                    Verifying...
                                </>
                            ) : (
                                t('checkin.verify')
                            )}
                        </button>
                    </>
                )}

                {checkInStatus === 'success' && (
                    <div className="checkin-result success">
                        <div className="result-icon">✓</div>
                        <h2>{t('checkin.success')}</h2>
                        <p>You earned +{quest.reward} TOUR tokens!</p>
                        <div className="confetti">🎉</div>
                    </div>
                )}

                {checkInStatus === 'failed' && (
                    <div className="checkin-result failed">
                        <div className="result-icon">✗</div>
                        <h2>{t('checkin.failed')}</h2>
                        <p>{t('checkin.distance_required')}</p>
                        <button
                            className="btn-secondary"
                            onClick={() => setCheckInStatus('idle')}
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckIn;
