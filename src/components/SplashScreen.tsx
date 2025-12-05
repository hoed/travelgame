import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen: React.FC = () => {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 500),
            setTimeout(() => setStage(2), 2000),
            setTimeout(() => setStage(3), 4000),
            setTimeout(() => setStage(4), 6000),
        ];
        return () => timers.forEach(timer => clearTimeout(timer));
    }, []);

    return (
        <div className="splash-screen">
            <div className="splash-content">
                {/* Stage 1: Logo appears */}
                <div className={`logo-container ${stage >= 1 ? 'visible' : ''}`}>
                    <div className="logo-circle">
                        <img src="/logo.png" alt="Smartour Logo" className="logo-image" />
                    </div>
                    <h1 className="logo-text">Smartour</h1>
                </div>

                {/* Stage 2: Tagline */}
                {stage >= 2 && (
                    <div className="tagline fade-in">
                        <p>Explore Indonesia, Earn Rewards</p>
                    </div>
                )}

                {/* Stage 3: Token introduction */}
                {stage >= 3 && (
                    <div className="token-intro slide-up">
                        <div className="token-badge">
                            <span className="token-icon">💎</span>
                            <div className="token-info">
                                <span className="token-name">Smartour Token</span>
                                <span className="token-symbol">SMT</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stage 4: Loading animation */}
                {stage >= 4 && (
                    <div className="loading-container fade-in">
                        <div className="loading-bar">
                            <div className="loading-progress"></div>
                        </div>
                        <p className="loading-text">Preparing your adventure...</p>
                    </div>
                )}

                {/* Animated particles */}
                <div className="particles">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${3 + Math.random() * 4}s`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
