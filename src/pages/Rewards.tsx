import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useGame } from '../contexts/GameContext';
import './Rewards.css';

interface Reward {
    id: string;
    title: string;
    description: string;
    type: 'voucher' | 'discount' | 'merchandise';
    cost: number;
    partner: string;
    image: string;
    available: boolean;
}

const Rewards = () => {
    const { tokenBalance, useNonCryptoMode, claimTokens } = useWallet();
    const { t } = useLanguage();
    const { userStats } = useGame();
    const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
    const [showRedeemModal, setShowRedeemModal] = useState(false);

    const availableRewards: Reward[] = [
        {
            id: 'r1',
            title: '10% Off at Tanggulangin Leather Shop',
            description: 'Get 10% discount on all leather products',
            type: 'discount',
            cost: 50,
            partner: 'Tanggulangin Leather Center',
            image: '🎒',
            available: true,
        },
        {
            id: 'r2',
            title: 'Free Coffee at Surabaya Café',
            description: 'Redeem for one free coffee at participating cafés',
            type: 'voucher',
            cost: 75,
            partner: 'Surabaya Coffee Network',
            image: '☕',
            available: true,
        },
        {
            id: 'r3',
            title: 'Mount Bromo Tour Discount',
            description: '20% off on guided Mount Bromo sunrise tour',
            type: 'discount',
            cost: 150,
            partner: 'Bromo Adventure Tours',
            image: '🏔️',
            available: true,
        },
        {
            id: 'r4',
            title: 'Smartour T-Shirt',
            description: 'Exclusive Smartour explorer t-shirt',
            type: 'merchandise',
            cost: 200,
            partner: 'Smartour Official',
            image: '👕',
            available: true,
        },
        {
            id: 'r5',
            title: 'Traditional Batik Workshop',
            description: 'Free entry to batik-making workshop',
            type: 'voucher',
            cost: 100,
            partner: 'Sidoarjo Cultural Center',
            image: '🎨',
            available: true,
        },
        {
            id: 'r6',
            title: 'Restaurant Voucher - 50k IDR',
            description: 'Voucher worth 50,000 IDR at local restaurants',
            type: 'voucher',
            cost: 120,
            partner: 'East Java Restaurant Alliance',
            image: '🍽️',
            available: true,
        },
    ];

    const currentBalance = parseFloat(
        useNonCryptoMode
            ? localStorage.getItem('gameCredits') || '0'
            : tokenBalance
    );

    const handleRedeemClick = (reward: Reward) => {
        setSelectedReward(reward);
        setShowRedeemModal(true);
    };

    const handleConfirmRedeem = async () => {
        if (!selectedReward) return;

        if (currentBalance >= selectedReward.cost) {
            // Deduct tokens
            const newBalance = currentBalance - selectedReward.cost;

            if (useNonCryptoMode) {
                localStorage.setItem('gameCredits', newBalance.toString());
            } else {
                // In production, this would call backend API to process redemption
                console.log('Redeeming reward:', selectedReward.id);
            }

            alert(`Successfully redeemed: ${selectedReward.title}!\nCheck your email for the voucher code.`);
            setShowRedeemModal(false);
            setSelectedReward(null);
        } else {
            alert('Insufficient balance!');
        }
    };

    const handleClaimTokens = async () => {
        const pendingTokens = userStats.tokensEarned - currentBalance;
        if (pendingTokens > 0) {
            const success = await claimTokens(pendingTokens);
            if (success) {
                alert(t('wallet.claimed'));
            }
        }
    };

    const pendingTokens = userStats.tokensEarned - currentBalance;

    return (
        <div className="rewards-container">
            <header className="rewards-header">
                <h1>{t('rewards.title')}</h1>
                <div className="balance-card">
                    <div className="balance-info">
                        <span className="balance-label">Your Balance</span>
                        <span className="balance-value">
                            {currentBalance.toFixed(0)} {useNonCryptoMode ? 'Credits' : 'TOUR'}
                        </span>
                    </div>
                    {pendingTokens > 0 && (
                        <div className="pending-tokens">
                            <span>+{pendingTokens} pending</span>
                            <button className="claim-btn" onClick={handleClaimTokens}>
                                {t('wallet.claim')}
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <div className="rewards-content">
                <h2>{t('rewards.available')}</h2>
                <div className="rewards-grid">
                    {availableRewards.map((reward) => {
                        const canAfford = currentBalance >= reward.cost;

                        return (
                            <div
                                key={reward.id}
                                className={`reward-card ${!canAfford ? 'locked' : ''}`}
                            >
                                <div className="reward-image">{reward.image}</div>
                                <div className="reward-content">
                                    <h3>{reward.title}</h3>
                                    <p className="reward-description">{reward.description}</p>
                                    <p className="reward-partner">by {reward.partner}</p>

                                    <div className="reward-footer">
                                        <div className="reward-cost">
                                            <span className="cost-value">{reward.cost}</span>
                                            <span className="cost-label">
                                                {useNonCryptoMode ? 'Credits' : 'TOUR'}
                                            </span>
                                        </div>
                                        <button
                                            className="redeem-btn"
                                            onClick={() => handleRedeemClick(reward)}
                                            disabled={!canAfford}
                                        >
                                            {canAfford ? t('rewards.redeem') : '🔒 Locked'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {showRedeemModal && selectedReward && (
                <div className="modal-overlay" onClick={() => setShowRedeemModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="modal-close"
                            onClick={() => setShowRedeemModal(false)}
                        >
                            ×
                        </button>

                        <div className="modal-header">
                            <div className="modal-icon">{selectedReward.image}</div>
                            <h2>Redeem Reward</h2>
                        </div>

                        <div className="modal-body">
                            <h3>{selectedReward.title}</h3>
                            <p>{selectedReward.description}</p>
                            <p className="modal-partner">Partner: {selectedReward.partner}</p>

                            <div className="modal-cost">
                                <span>Cost:</span>
                                <span className="cost-amount">
                                    {selectedReward.cost} {useNonCryptoMode ? 'Credits' : 'TOUR'}
                                </span>
                            </div>

                            <div className="modal-balance">
                                <span>Your Balance:</span>
                                <span className="balance-amount">
                                    {currentBalance.toFixed(0)} {useNonCryptoMode ? 'Credits' : 'TOUR'}
                                </span>
                            </div>

                            <div className="modal-remaining">
                                <span>After Redemption:</span>
                                <span className="remaining-amount">
                                    {(currentBalance - selectedReward.cost).toFixed(0)}{' '}
                                    {useNonCryptoMode ? 'Credits' : 'TOUR'}
                                </span>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button
                                className="btn-secondary"
                                onClick={() => setShowRedeemModal(false)}
                            >
                                {t('common.cancel')}
                            </button>
                            <button className="btn-primary" onClick={handleConfirmRedeem}>
                                {t('common.confirm')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Rewards;
