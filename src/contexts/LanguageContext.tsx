import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'en' | 'id';

interface Translations {
    [key: string]: {
        en: string;
        id: string;
    };
}

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Translations = {
    // Navigation
    'nav.home': { en: 'Home', id: 'Beranda' },
    'nav.map': { en: 'Map', id: 'Peta' },
    'nav.quests': { en: 'Quests', id: 'Misi' },
    'nav.profile': { en: 'Profile', id: 'Profil' },
    'nav.leaderboard': { en: 'Leaderboard', id: 'Papan Peringkat' },
    'nav.rewards': { en: 'Rewards', id: 'Hadiah' },

    // Onboarding
    'onboarding.welcome': { en: 'Welcome to Smartour!', id: 'Selamat Datang di Smartour!' },
    'onboarding.subtitle': { en: 'Explore Indonesia, Earn Rewards', id: 'Jelajahi Indonesia, Dapatkan Hadiah' },
    'onboarding.step1.title': { en: 'Discover Places', id: 'Temukan Tempat' },
    'onboarding.step1.desc': { en: 'Explore amazing destinations across Indonesia', id: 'Jelajahi destinasi menakjubkan di seluruh Indonesia' },
    'onboarding.step2.title': { en: 'Complete Quests', id: 'Selesaikan Misi' },
    'onboarding.step2.desc': { en: 'Take on challenges and earn TOUR tokens', id: 'Ambil tantangan dan dapatkan token TOUR' },
    'onboarding.step3.title': { en: 'Get Rewards', id: 'Dapatkan Hadiah' },
    'onboarding.step3.desc': { en: 'Redeem tokens for discounts and vouchers', id: 'Tukarkan token untuk diskon dan voucher' },
    'onboarding.next': { en: 'Next', id: 'Lanjut' },
    'onboarding.start': { en: 'Start Exploring', id: 'Mulai Jelajah' },
    'onboarding.skip': { en: 'Skip', id: 'Lewati' },

    // Home
    'home.greeting': { en: 'Hello, Explorer!', id: 'Halo, Penjelajah!' },
    'home.stats.level': { en: 'Level', id: 'Level' },
    'home.stats.tokens': { en: 'Tokens', id: 'Token' },
    'home.stats.places': { en: 'Places', id: 'Tempat' },
    'home.stats.quests': { en: 'Quests', id: 'Misi' },
    'home.daily_quest': { en: 'Daily Quest', id: 'Misi Harian' },
    'home.nearby_places': { en: 'Nearby Places', id: 'Tempat Terdekat' },
    'home.achievements': { en: 'Recent Achievements', id: 'Pencapaian Terbaru' },

    // Quests
    'quest.difficulty.easy': { en: 'Easy', id: 'Mudah' },
    'quest.difficulty.medium': { en: 'Medium', id: 'Sedang' },
    'quest.difficulty.hard': { en: 'Hard', id: 'Sulit' },
    'quest.type.visit': { en: 'Visit', id: 'Kunjungi' },
    'quest.type.photo': { en: 'Photo', id: 'Foto' },
    'quest.type.challenge': { en: 'Challenge', id: 'Tantangan' },
    'quest.type.social': { en: 'Social', id: 'Sosial' },
    'quest.reward': { en: 'Reward', id: 'Hadiah' },
    'quest.start': { en: 'Start Quest', id: 'Mulai Misi' },
    'quest.complete': { en: 'Complete', id: 'Selesaikan' },
    'quest.completed': { en: 'Completed', id: 'Selesai' },
    'quest.distance': { en: 'Distance', id: 'Jarak' },

    // Quest Details
    'quest.candi_pari.title': { en: 'Visit Candi Pari', id: 'Kunjungi Candi Pari' },
    'quest.candi_pari.description': { en: 'Explore the ancient Candi Pari temple in Sidoarjo', id: 'Jelajahi candi kuno Candi Pari di Sidoarjo' },
    'quest.delta_fishing.title': { en: 'Delta Fishing Village', id: 'Desa Nelayan Delta' },
    'quest.delta_fishing.description': { en: 'Visit the traditional fishing village and take a photo with local fishermen', id: 'Kunjungi desa nelayan tradisional dan foto bersama nelayan lokal' },
    'quest.tanggulangin.title': { en: 'Tanggulangin Leather Center', id: 'Pusat Kerajinan Kulit Tanggulangin' },
    'quest.tanggulangin.description': { en: 'Explore the famous leather craft center and share your experience', id: 'Jelajahi pusat kerajinan kulit terkenal dan bagikan pengalamanmu' },
    'quest.bromo.title': { en: 'Mount Bromo Sunrise', id: 'Sunrise Gunung Bromo' },
    'quest.bromo.description': { en: 'Witness the legendary sunrise at Mount Bromo', id: 'Saksikan sunrise legendaris di Gunung Bromo' },
    'quest.tugu_pahlawan.title': { en: 'Surabaya Heroes Monument', id: 'Tugu Pahlawan Surabaya' },
    'quest.tugu_pahlawan.description': { en: 'Visit the iconic Tugu Pahlawan in Surabaya', id: 'Kunjungi Tugu Pahlawan yang ikonik di Surabaya' },

    // Achievements
    'achievement.first_steps.name': { en: 'First Steps', id: 'Langkah Pertama' },
    'achievement.first_steps.description': { en: 'Complete your first quest', id: 'Selesaikan misi pertamamu' },
    'achievement.explorer.name': { en: 'Explorer', id: 'Penjelajah' },
    'achievement.explorer.description': { en: 'Visit 5 different locations', id: 'Kunjungi 5 lokasi berbeda' },
    'achievement.social_butterfly.name': { en: 'Social Butterfly', id: 'Kupu-kupu Sosial' },
    'achievement.social_butterfly.description': { en: 'Share 3 experiences on social media', id: 'Bagikan 3 pengalaman di media sosial' },
    'achievement.token_collector.name': { en: 'Token Collector', id: 'Kolektor Token' },
    'achievement.token_collector.description': { en: 'Earn 500 TOUR tokens', id: 'Dapatkan 500 token TOUR' },
    'achievement.week_warrior.name': { en: 'Week Warrior', id: 'Pejuang Mingguan' },
    'achievement.week_warrior.description': { en: 'Maintain a 7-day streak', id: 'Pertahankan streak 7 hari' },

    // Profile
    'profile.title': { en: 'Profile', id: 'Profil' },
    'profile.stats': { en: 'Statistics', id: 'Statistik' },
    'profile.achievements': { en: 'Achievements', id: 'Pencapaian' },
    'profile.settings': { en: 'Settings', id: 'Pengaturan' },
    'profile.wallet': { en: 'Wallet', id: 'Dompet' },
    'profile.language': { en: 'Language', id: 'Bahasa' },

    // Wallet
    'wallet.connect': { en: 'Connect Wallet', id: 'Hubungkan Dompet' },
    'wallet.disconnect': { en: 'Disconnect', id: 'Putuskan' },
    'wallet.balance': { en: 'Balance', id: 'Saldo' },
    'wallet.claim': { en: 'Claim Tokens', id: 'Klaim Token' },
    'wallet.claimed': { en: 'Tokens Claimed!', id: 'Token Diklaim!' },
    'wallet.non_crypto_mode': { en: 'Non-Crypto Mode', id: 'Mode Non-Kripto' },
    'wallet.game_credits': { en: 'Game Credits', id: 'Kredit Game' },

    // Check-in
    'checkin.title': { en: 'Check In', id: 'Check In' },
    'checkin.verify': { en: 'Verify Location', id: 'Verifikasi Lokasi' },
    'checkin.success': { en: 'Check-in Successful!', id: 'Check-in Berhasil!' },
    'checkin.failed': { en: 'Too far from location', id: 'Terlalu jauh dari lokasi' },
    'checkin.distance_required': { en: 'You must be within 100m', id: 'Anda harus dalam radius 100m' },

    // Leaderboard
    'leaderboard.title': { en: 'Leaderboard', id: 'Papan Peringkat' },
    'leaderboard.rank': { en: 'Rank', id: 'Peringkat' },
    'leaderboard.player': { en: 'Player', id: 'Pemain' },
    'leaderboard.score': { en: 'Score', id: 'Skor' },

    // Rewards
    'rewards.title': { en: 'Rewards', id: 'Hadiah' },
    'rewards.available': { en: 'Available Rewards', id: 'Hadiah Tersedia' },
    'rewards.redeem': { en: 'Redeem', id: 'Tukar' },
    'rewards.vouchers': { en: 'Vouchers', id: 'Voucher' },
    'rewards.discounts': { en: 'Discounts', id: 'Diskon' },

    // Common
    'common.loading': { en: 'Loading...', id: 'Memuat...' },
    'common.error': { en: 'Error', id: 'Kesalahan' },
    'common.success': { en: 'Success', id: 'Berhasil' },
    'common.cancel': { en: 'Cancel', id: 'Batal' },
    'common.confirm': { en: 'Confirm', id: 'Konfirmasi' },
    'common.close': { en: 'Close', id: 'Tutup' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        // Check saved language preference
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang) {
            setLanguageState(savedLang);
        } else {
            // Detect from Telegram user language
            const tgLang = window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code;
            if (tgLang === 'id' || tgLang === 'in') {
                setLanguageState('id');
            }
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    };

    const t = (key: string): string => {
        return translations[key]?.[language] || key;
    };

    const value: LanguageContextType = {
        language,
        setLanguage,
        t,
    };

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
