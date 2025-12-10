import React from 'react';
import './CartoonCharacter.css';

interface CartoonCharacterProps {
    type?: 'explorer' | 'guide' | 'happy' | 'thinking' | 'flying' | 'celebrating';
    size?: 'small' | 'medium' | 'large';
    animate?: boolean;
}

const CartoonCharacter: React.FC<CartoonCharacterProps> = ({
    type = 'explorer',
    size = 'medium',
    animate = true
}) => {
    const sizeMap = {
        small: 60,
        medium: 100,
        large: 150
    };

    const dimensions = sizeMap[size];

    return (
        <div className={`cartoon-character ${type} ${size} ${animate ? 'animated' : ''}`}>
            <svg
                width={dimensions}
                height={dimensions}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Glow Effect */}
                <defs>
                    <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00d4ff" />
                        <stop offset="100%" stopColor="#0099cc" />
                    </linearGradient>
                    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff6b9d" />
                        <stop offset="100%" stopColor="#e64a7b" />
                    </linearGradient>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffd93d" />
                        <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                </defs>

                {/* Background Glow */}
                <circle cx="50" cy="50" r="48" fill="url(#glowGradient)" className="glow-circle" />

                {/* Body */}
                <ellipse cx="50" cy="65" rx="18" ry="22" fill="url(#bodyGradient)" className="body" />

                {/* Head */}
                <circle cx="50" cy="35" r="22" fill="url(#bodyGradient)" className="head" />

                {/* Face Highlight */}
                <ellipse cx="45" cy="30" rx="8" ry="6" fill="rgba(255,255,255,0.2)" />

                {/* Eyes */}
                <g className="eyes">
                    <ellipse cx="42" cy="33" rx="5" ry="6" fill="white" />
                    <ellipse cx="58" cy="33" rx="5" ry="6" fill="white" />
                    <circle cx="43" cy="34" r="3" fill="#1e1b4b" className="pupil left" />
                    <circle cx="59" cy="34" r="3" fill="#1e1b4b" className="pupil right" />
                    <circle cx="44" cy="32" r="1" fill="white" />
                    <circle cx="60" cy="32" r="1" fill="white" />
                </g>

                {/* Mouth */}
                {type === 'happy' || type === 'celebrating' ? (
                    <path
                        d="M 43 44 Q 50 52 57 44"
                        stroke="url(#accentGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                        className="mouth happy"
                    />
                ) : type === 'thinking' ? (
                    <circle cx="55" cy="45" r="3" fill="url(#accentGradient)" className="mouth thinking" />
                ) : (
                    <path
                        d="M 45 45 Q 50 48 55 45"
                        stroke="url(#accentGradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                        className="mouth"
                    />
                )}

                {/* Antenna */}
                <g className="antenna">
                    <line x1="50" y1="13" x2="50" y2="5" stroke="url(#bodyGradient)" strokeWidth="2" />
                    <circle cx="50" cy="3" r="4" fill="url(#accentGradient)" className="antenna-ball" />
                </g>

                {/* Explorer Hat */}
                {type === 'explorer' && (
                    <g className="hat">
                        <ellipse cx="50" cy="18" rx="20" ry="6" fill="url(#goldGradient)" />
                        <rect x="38" y="12" width="24" height="8" rx="2" fill="url(#goldGradient)" />
                        <rect x="40" y="16" width="20" height="3" fill="url(#accentGradient)" />
                    </g>
                )}

                {/* Guide Headset */}
                {type === 'guide' && (
                    <g className="headset">
                        <path
                            d="M 28 35 Q 28 20 50 20 Q 72 20 72 35"
                            stroke="#374151"
                            strokeWidth="3"
                            fill="none"
                        />
                        <circle cx="28" cy="38" r="5" fill="#374151" />
                        <rect x="20" y="40" width="8" height="12" rx="2" fill="#374151" />
                    </g>
                )}

                {/* Flying Jetpack */}
                {type === 'flying' && (
                    <g className="jetpack">
                        <rect x="35" y="55" width="30" height="25" rx="5" fill="#4f46e5" />
                        <ellipse cx="42" cy="85" rx="4" ry="8" fill="url(#goldGradient)" className="flame left" />
                        <ellipse cx="58" cy="85" rx="4" ry="8" fill="url(#goldGradient)" className="flame right" />
                    </g>
                )}

                {/* Celebrating Stars */}
                {type === 'celebrating' && (
                    <g className="stars">
                        <text x="20" y="20" fontSize="12" className="star star-1">⭐</text>
                        <text x="75" y="15" fontSize="10" className="star star-2">✨</text>
                        <text x="15" y="50" fontSize="8" className="star star-3">⭐</text>
                        <text x="80" y="45" fontSize="10" className="star star-4">✨</text>
                    </g>
                )}

                {/* Thinking Bubbles */}
                {type === 'thinking' && (
                    <g className="thought-bubbles">
                        <circle cx="75" cy="25" r="4" fill="rgba(255,255,255,0.3)" className="bubble b1" />
                        <circle cx="82" cy="18" r="6" fill="rgba(255,255,255,0.3)" className="bubble b2" />
                        <circle cx="90" cy="8" r="8" fill="rgba(255,255,255,0.3)" className="bubble b3" />
                    </g>
                )}

                {/* Arms */}
                <g className="arms">
                    <ellipse cx="28" cy="60" rx="6" ry="12" fill="url(#bodyGradient)" className="arm left" />
                    <ellipse cx="72" cy="60" rx="6" ry="12" fill="url(#bodyGradient)" className="arm right" />
                </g>

                {/* Legs */}
                <g className="legs">
                    <ellipse cx="42" cy="85" rx="6" ry="10" fill="url(#bodyGradient)" className="leg left" />
                    <ellipse cx="58" cy="85" rx="6" ry="10" fill="url(#bodyGradient)" className="leg right" />
                </g>
            </svg>
        </div>
    );
};

export default CartoonCharacter;
