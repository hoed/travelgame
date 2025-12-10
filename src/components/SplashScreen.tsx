import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen: React.FC = () => {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 500),
            setTimeout(() => setStage(2), 2000),
            setTimeout(() => setStage(3), 4000),
            setTimeout(() => setStage(4), 5500),
        ];
        return () => timers.forEach(timer => clearTimeout(timer));
    }, []);

    return (
        <div className="splash-screen">
            {/* Animated Background */}
            <div className="splash-bg">
                <div className="grid-lines"></div>
                <div className="floating-shapes">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className={`shape shape-${i % 4}`}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${5 + Math.random() * 10}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="splash-content">
                {/* Stage 1: Logo appears */}
                <div className={`logo-container ${stage >= 1 ? 'visible' : ''}`}>
                    <div className="logo-ring outer"></div>
                    <div className="logo-ring middle"></div>
                    <div className="logo-ring inner"></div>
                    <div className="logo-circle">
                        <div className="logo-mascot">
                            <div className="mascot-head">
                                <div className="mascot-eyes">
                                    <div className="eye left"><div className="pupil"></div></div>
                                    <div className="eye right"><div className="pupil"></div></div>
                                </div>
                                <div className="mascot-mouth"></div>
                                <div className="mascot-antenna">
                                    <div className="antenna-ball"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="logo-text">
                        <span className="logo-smart">SMART</span>
                        <span className="logo-tour">OUR</span>
                    </h1>
                    <p className="logo-subtitle">Indonesia Travel Quest</p>
                </div>

                {/* Stage 2: Tagline */}
                {stage >= 2 && (
                    <div className="tagline fade-in">
                        <div className="tagline-line"></div>
                        <p>Explore Indonesia, Earn Rewards</p>
                        <div className="tagline-line"></div>
                    </div>
                )}

                {/* Stage 3: Token introduction */}
                {stage >= 3 && (
                    <div className="token-intro slide-up">
                        <div className="token-badge">
                            <div className="token-glow"></div>
                            <span className="token-icon">💎</span>
                            <div className="token-info">
                                <span className="token-name">Smartour Token</span>
                                <span className="token-symbol">SMT</span>
                            </div>
                        </div>
                        <div className="features-row">
                            <div className="feature-item">
                                <span className="feature-icon">🗺️</span>
                                <span>150+ Quests</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🏝️</span>
                                <span>8 Regions</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🎁</span>
                                <span>Real Rewards</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stage 4: Loading animation */}
                {stage >= 4 && (
                    <div className="loading-container fade-in">
                        <div className="loading-bar">
                            <div className="loading-progress"></div>
                            <div className="loading-glow"></div>
                        </div>
                        <p className="loading-text">
                            <span className="loading-dot">.</span>
                            <span className="loading-dot">.</span>
                            <span className="loading-dot">.</span>
                            Preparing your adventure
                            <span className="loading-dot">.</span>
                            <span className="loading-dot">.</span>
                            <span className="loading-dot">.</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SplashScreen;
