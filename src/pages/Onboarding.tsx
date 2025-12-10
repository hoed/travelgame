import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import CartoonCharacter from '../components/CartoonCharacter';
import './Onboarding.css';

interface OnboardingProps {
    onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
    const { t, language, setLanguage } = useLanguage();
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            icon: '🗺️',
            character: 'explorer' as const,
            title: t('onboarding.step1.title'),
            description: t('onboarding.step1.desc'),
        },
        {
            icon: '🎯',
            character: 'guide' as const,
            title: t('onboarding.step2.title'),
            description: t('onboarding.step2.desc'),
        },
        {
            icon: '🎁',
            character: 'celebrating' as const,
            title: t('onboarding.step3.title'),
            description: t('onboarding.step3.desc'),
        },
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete();
        }
    };

    const handleSkip = () => {
        onComplete();
    };

    return (
        <div className="onboarding-container">
            <div className="language-selector">
                <button
                    className={language === 'en' ? 'active' : ''}
                    onClick={() => setLanguage('en')}
                >
                    EN
                </button>
                <button
                    className={language === 'id' ? 'active' : ''}
                    onClick={() => setLanguage('id')}
                >
                    ID
                </button>
            </div>

            <div className="onboarding-content">
                <h1 className="onboarding-title">{t('onboarding.welcome')}</h1>
                <p className="onboarding-subtitle">{t('onboarding.subtitle')}</p>

                <div className="step-container">
                    <div className="step-character">
                        <CartoonCharacter type={steps[currentStep].character} size="large" />
                    </div>
                    <h2 className="step-title">{steps[currentStep].title}</h2>
                    <p className="step-description">{steps[currentStep].description}</p>
                </div>

                <div className="step-indicators">
                    {steps.map((_, index) => (
                        <div
                            key={index}
                            className={`indicator ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''
                                }`}
                        />
                    ))}
                </div>

                <div className="onboarding-actions">
                    <button className="btn-secondary" onClick={handleSkip}>
                        {t('onboarding.skip')}
                    </button>
                    <button className="btn-primary" onClick={handleNext}>
                        {currentStep === steps.length - 1
                            ? t('onboarding.start')
                            : t('onboarding.next')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
