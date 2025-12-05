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
    'onboarding.step2.desc': { en: 'Take on challenges and earn SMT tokens', id: 'Ambil tantangan dan dapatkan token SMT' },
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

    // Quest Details - SUMATRA
    'quest.lake_toba.title': { en: 'Lake Toba Paradise', id: 'Surga Danau Toba' },
    'quest.lake_toba.description': { en: 'Visit the largest volcanic lake in the world and explore Samosir Island', id: 'Kunjungi danau vulkanik terbesar di dunia dan jelajahi Pulau Samosir' },
    'quest.bukit_lawang.title': { en: 'Bukit Lawang Orangutan Trek', id: 'Trekking Orangutan Bukit Lawang' },
    'quest.bukit_lawang.description': { en: 'Trek through the rainforest and spot wild orangutans', id: 'Trekking melalui hutan hujan dan lihat orangutan liar' },
    'quest.tsunami_museum.title': { en: 'Banda Aceh Tsunami Museum', id: 'Museum Tsunami Banda Aceh' },
    'quest.tsunami_museum.description': { en: 'Learn about the 2004 tsunami at this memorial museum', id: 'Pelajari tentang tsunami 2004 di museum memorial ini' },
    'quest.mentawai.title': { en: 'Mentawai Islands Surf', id: 'Surfing Kepulauan Mentawai' },
    'quest.mentawai.description': { en: 'Experience world-class surfing in the Mentawai Islands', id: 'Rasakan surfing kelas dunia di Kepulauan Mentawai' },

    // Quest Details - JAVA
    'quest.borobudur.title': { en: 'Borobudur Temple Sunrise', id: 'Sunrise Candi Borobudur' },
    'quest.borobudur.description': { en: 'Witness sunrise at the world\'s largest Buddhist temple', id: 'Saksikan sunrise di candi Buddha terbesar di dunia' },
    'quest.prambanan.title': { en: 'Prambanan Temple Complex', id: 'Kompleks Candi Prambanan' },
    'quest.prambanan.description': { en: 'Explore the magnificent Hindu temple complex', id: 'Jelajahi kompleks candi Hindu yang megah' },
    'quest.bromo.title': { en: 'Mount Bromo Sunrise', id: 'Sunrise Gunung Bromo' },
    'quest.bromo.description': { en: 'Witness the legendary sunrise at Mount Bromo', id: 'Saksikan sunrise legendaris di Gunung Bromo' },
    'quest.ijen.title': { en: 'Ijen Blue Fire', id: 'Api Biru Ijen' },
    'quest.ijen.description': { en: 'Trek to see the mystical blue fire phenomenon', id: 'Trekking untuk melihat fenomena api biru yang mistis' },
    'quest.monas.title': { en: 'Jakarta National Monument', id: 'Monumen Nasional Jakarta' },
    'quest.monas.description': { en: 'Visit Monas, the iconic symbol of Indonesian independence', id: 'Kunjungi Monas, simbol ikonik kemerdekaan Indonesia' },

    // Quest Details - BALI
    'quest.tanah_lot.title': { en: 'Tanah Lot Temple', id: 'Pura Tanah Lot' },
    'quest.tanah_lot.description': { en: 'Visit the iconic sea temple at sunset', id: 'Kunjungi pura laut ikonik saat sunset' },
    'quest.tegallalang.title': { en: 'Ubud Rice Terraces', id: 'Sawah Terasering Ubud' },
    'quest.tegallalang.description': { en: 'Explore the stunning Tegallalang rice terraces', id: 'Jelajahi sawah terasering Tegallalang yang menakjubkan' },
    'quest.batur.title': { en: 'Mount Batur Sunrise Trek', id: 'Trekking Sunrise Gunung Batur' },
    'quest.batur.description': { en: 'Hike Mount Batur for a spectacular sunrise view', id: 'Mendaki Gunung Batur untuk pemandangan sunrise yang spektakuler' },

    // Quest Details - KALIMANTAN
    'quest.tanjung_puting.title': { en: 'Tanjung Puting Orangutan', id: 'Orangutan Tanjung Puting' },
    'quest.tanjung_puting.description': { en: 'Cruise through the jungle and meet orangutans', id: 'Berlayar melalui hutan dan bertemu orangutan' },
    'quest.derawan.title': { en: 'Derawan Islands Diving', id: 'Diving Kepulauan Derawan' },
    'quest.derawan.description': { en: 'Dive with manta rays and sea turtles', id: 'Menyelam bersama pari manta dan penyu' },
    'quest.dayak_longhouse.title': { en: 'Dayak Longhouse Visit', id: 'Kunjungan Rumah Betang Dayak' },
    'quest.dayak_longhouse.description': { en: 'Experience traditional Dayak culture in a longhouse', id: 'Rasakan budaya tradisional Dayak di rumah betang' },

    // Quest Details - SULAWESI
    'quest.bunaken.title': { en: 'Bunaken Marine Park', id: 'Taman Laut Bunaken' },
    'quest.bunaken.description': { en: 'Snorkel in one of Indonesia\'s best marine parks', id: 'Snorkeling di salah satu taman laut terbaik Indonesia' },
    'quest.toraja.title': { en: 'Toraja Funeral Ceremony', id: 'Upacara Pemakaman Toraja' },
    'quest.toraja.description': { en: 'Witness the unique Toraja funeral traditions', id: 'Saksikan tradisi pemakaman unik Toraja' },
    'quest.togean.title': { en: 'Togean Islands Paradise', id: 'Surga Kepulauan Togean' },
    'quest.togean.description': { en: 'Explore the pristine Togean Islands', id: 'Jelajahi Kepulauan Togean yang masih alami' },

    // Quest Details - NUSA TENGGARA
    'quest.komodo.title': { en: 'Komodo Dragon Encounter', id: 'Bertemu Komodo' },
    'quest.komodo.description': { en: 'See the legendary Komodo dragons in their natural habitat', id: 'Lihat komodo legendaris di habitat aslinya' },
    'quest.pink_beach.title': { en: 'Pink Beach Paradise', id: 'Surga Pantai Pink' },
    'quest.pink_beach.description': { en: 'Visit the rare pink sand beach', id: 'Kunjungi pantai pasir pink yang langka' },
    'quest.rinjani.title': { en: 'Mount Rinjani Summit', id: 'Puncak Gunung Rinjani' },
    'quest.rinjani.description': { en: 'Conquer the second highest volcano in Indonesia', id: 'Taklukkan gunung berapi tertinggi kedua di Indonesia' },

    // Quest Details - MALUKU
    'quest.banda.title': { en: 'Banda Islands Spice Route', id: 'Jalur Rempah Kepulauan Banda' },
    'quest.banda.description': { en: 'Explore the historic Spice Islands', id: 'Jelajahi Kepulauan Rempah yang bersejarah' },
    'quest.ambon.title': { en: 'Ambon Bay Diving', id: 'Diving Teluk Ambon' },
    'quest.ambon.description': { en: 'Discover rare marine life in Ambon Bay', id: 'Temukan biota laut langka di Teluk Ambon' },

    // Quest Details - PAPUA
    'quest.raja_ampat.title': { en: 'Raja Ampat Diving', id: 'Diving Raja Ampat' },
    'quest.raja_ampat.description': { en: 'Dive in the world\'s most biodiverse marine ecosystem', id: 'Menyelam di ekosistem laut paling beragam di dunia' },
    'quest.baliem.title': { en: 'Baliem Valley Trek', id: 'Trekking Lembah Baliem' },
    'quest.baliem.description': { en: 'Trek through the highlands and meet the Dani tribe', id: 'Trekking melalui dataran tinggi dan bertemu suku Dani' },
    'quest.carstensz.title': { en: 'Carstensz Pyramid Base', id: 'Base Camp Puncak Carstensz' },
    'quest.carstensz.description': { en: 'Trek to the base of Indonesia\'s highest peak', id: 'Trekking ke base camp puncak tertinggi Indonesia' },

    // Old quests (keeping for backward compatibility)
    'quest.candi_pari.title': { en: 'Visit Candi Pari', id: 'Kunjungi Candi Pari' },
    'quest.candi_pari.description': { en: 'Explore the ancient Candi Pari temple in Sidoarjo', id: 'Jelajahi candi kuno Candi Pari di Sidoarjo' },
    'quest.delta_fishing.title': { en: 'Delta Fishing Village', id: 'Desa Nelayan Delta' },
    'quest.delta_fishing.description': { en: 'Visit the traditional fishing village and take a photo with local fishermen', id: 'Kunjungi desa nelayan tradisional dan foto bersama nelayan lokal' },
    'quest.tanggulangin.title': { en: 'Tanggulangin Leather Center', id: 'Pusat Kerajinan Kulit Tanggulangin' },
    'quest.tanggulangin.description': { en: 'Explore the famous leather craft center and share your experience', id: 'Jelajahi pusat kerajinan kulit terkenal dan bagikan pengalamanmu' },
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
    'achievement.token_collector.description': { en: 'Earn 500 SMT tokens', id: 'Dapatkan 500 token SMT' },
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
