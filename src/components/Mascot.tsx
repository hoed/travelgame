import React from 'react';
import './Mascot.css';

interface MascotProps {
    type?: 'explorer' | 'guide' | 'celebration' | 'thinking' | 'flying';
    size?: 'small' | 'medium' | 'large';
    message?: string;
    animate?: boolean;
}

const Mascot: React.FC<MascotProps> = ({ 
    type = 'explorer', 
    size = 'medium',
    message,
    animate = true 
}) => {
    const getMascotEmoji = () => {
        switch (type) {
            case 'explorer':
                return (
                    <div className="mascot-character explorer">
                        <div className="mascot-body">
                            <div className="mascot-head">
                                <div className="mascot-face">
                                    <div className="mascot-eyes">
                                        <div className="eye left">
                                            <div className="pupil"></div>
                                        </div>
                                        <div className="eye right">
                                            <div className="pupil"></div>
                                        </div>
                                    </div>
                                    <div className="mascot-mouth happy"></div>
                                </div>
                                <div className="mascot-hat explorer-hat">
                                    <div className="hat-band"></div>
                                </div>
                                <div className="mascot-antenna">
                                    <div className="antenna-ball"></div>
                                </div>
                            </div>
                            <div className="mascot-torso">
                                <div className="backpack">
                                    <div className="backpack-pocket"></div>
                                </div>
                            </div>
                            <div className="mascot-arms">
                                <div className="arm left waving"></div>
                                <div className="arm right holding-map"></div>
                            </div>
                            <div className="mascot-legs">
                                <div className="leg left"></div>
                                <div className="leg right"></div>
                            </div>
                        </div>
                        <div className="mascot-glow"></div>
                    </div>
                );
            case 'guide':
                return (
                    <div className="mascot-character guide">
                        <div className="mascot-body">
                            <div className="mascot-head">
                                <div className="mascot-face">
                                    <div className="mascot-eyes">
                                        <div className="eye left wink">
                                            <div className="pupil"></div>
                                        </div>
                                        <div className="eye right">
                                            <div className="pupil"></div>
                                        </div>
                                    </div>
                                    <div className="mascot-mouth smile"></div>
                                </div>
                                <div className="mascot-headset">
                                    <div className="headset-mic"></div>
                                </div>
                            </div>
                            <div className="mascot-torso guide-uniform">
                                <div className="badge"></div>
                            </div>
                        </div>
                        <div className="mascot-glow cyan"></div>
                    </div>
                );
            case 'celebration':
                return (
                    <div className="mascot-character celebration">
                        <div className="confetti-container">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className={`confetti confetti-${i}`}></div>
                            ))}
                        </div>
                        <div className="mascot-body jumping">
                            <div className="mascot-head">
                                <div className="mascot-face">
                                    <div className="mascot-eyes excited">
                                        <div className="eye left star"></div>
                                        <div className="eye right star"></div>
                                    </div>
                                    <div className="mascot-mouth cheering"></div>
                                </div>
                                <div className="party-hat">
                                    <div className="hat-star"></div>
                                </div>
                            </div>
                            <div className="mascot-arms raised">
                                <div className="arm left up"></div>
                                <div className="arm right up"></div>
                            </div>
                        </div>
                        <div className="mascot-glow rainbow"></div>
                    </div>
                );
            case 'thinking':
                return (
                    <div className="mascot-character thinking">
                        <div className="thought-bubbles">
                            <div className="bubble small"></div>
                            <div className="bubble medium"></div>
                            <div className="bubble large">💡</div>
                        </div>
                        <div className="mascot-body">
                            <div className="mascot-head tilted">
                                <div className="mascot-face">
                                    <div className="mascot-eyes thinking-eyes">
                                        <div className="eye left looking-up"></div>
                                        <div className="eye right looking-up"></div>
                                    </div>
                                    <div className="mascot-mouth hmm"></div>
                                </div>
                            </div>
                            <div className="mascot-arms">
                                <div className="arm left chin"></div>
                            </div>
                        </div>
                    </div>
                );
            case 'flying':
                return (
                    <div className="mascot-character flying">
                        <div className="mascot-body">
                            <div className="mascot-head">
                                <div className="mascot-face">
                                    <div className="mascot-eyes determined">
                                        <div className="eye left"></div>
                                        <div className="eye right"></div>
                                    </div>
                                    <div className="mascot-mouth focused"></div>
                                </div>
                                <div className="pilot-goggles"></div>
                                <div className="pilot-scarf"></div>
                            </div>
                            <div className="jetpack">
                                <div className="flame left"></div>
                                <div className="flame right"></div>
                            </div>
                        </div>
                        <div className="speed-lines">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className={`speed-line line-${i}`}></div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`mascot-wrapper ${size} ${animate ? 'animated' : ''}`}>
            {getMascotEmoji()}
            {message && (
                <div className="mascot-speech-bubble">
                    <p>{message}</p>
                    <div className="bubble-tail"></div>
                </div>
            )}
        </div>
    );
};

export default Mascot;
