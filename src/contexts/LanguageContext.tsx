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
    'quest.ngarai_sianok.title': { en: 'Ngarai Sianok Canyon', id: 'Ngarai Sianok' },
    'quest.ngarai_sianok.description': { en: 'Explore the stunning canyon in Bukittinggi', id: 'Jelajahi ngarai menakjubkan di Bukittinggi' },
    'quest.ampera_bridge.title': { en: 'Ampera Bridge Palembang', id: 'Jembatan Ampera Palembang' },
    'quest.ampera_bridge.description': { en: 'Visit the iconic bridge over Musi River', id: 'Kunjungi jembatan ikonik di atas Sungai Musi' },
    'quest.nias_surf.title': { en: 'Nias Island Surfing', id: 'Surfing Pulau Nias' },
    'quest.nias_surf.description': { en: 'Ride the legendary waves of Nias', id: 'Taklukkan ombak legendaris Nias' },
    'quest.padang_beach.title': { en: 'Padang Beach Sunset', id: 'Sunset Pantai Padang' },
    'quest.padang_beach.description': { en: 'Watch sunset at Air Manis Beach', id: 'Saksikan sunset di Pantai Air Manis' },
    'quest.kerinci.title': { en: 'Kerinci Seblat National Park', id: 'Taman Nasional Kerinci Seblat' },
    'quest.kerinci.description': { en: 'Trek through pristine rainforest', id: 'Trekking melalui hutan hujan yang masih alami' },
    'quest.way_kambas.title': { en: 'Way Kambas Elephant Sanctuary', id: 'Suaka Gajah Way Kambas' },
    'quest.way_kambas.description': { en: 'Meet Sumatran elephants in their sanctuary', id: 'Bertemu gajah Sumatera di suaka mereka' },

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
    'quest.malioboro.title': { en: 'Malioboro Street Shopping', id: 'Belanja di Jalan Malioboro' },
    'quest.malioboro.description': { en: 'Experience the vibrant shopping street of Yogyakarta', id: 'Rasakan suasana jalan belanja yang ramai di Yogyakarta' },
    'quest.kraton.title': { en: 'Yogyakarta Kraton Palace', id: 'Keraton Yogyakarta' },
    'quest.kraton.description': { en: 'Visit the Sultan\'s Palace and learn Javanese culture', id: 'Kunjungi Keraton Sultan dan pelajari budaya Jawa' },
    'quest.taman_sari.title': { en: 'Taman Sari Water Castle', id: 'Taman Sari' },
    'quest.taman_sari.description': { en: 'Explore the royal garden and bathing complex', id: 'Jelajahi taman kerajaan dan kompleks pemandian' },
    'quest.mendut.title': { en: 'Mendut Temple Visit', id: 'Kunjungan Candi Mendut' },
    'quest.mendut.description': { en: 'Visit the ancient Buddhist temple near Borobudur', id: 'Kunjungi candi Buddha kuno dekat Borobudur' },
    'quest.ketep_pass.title': { en: 'Ketep Pass Merapi View', id: 'Pemandangan Merapi dari Ketep Pass' },
    'quest.ketep_pass.description': { en: 'Enjoy panoramic views of Mount Merapi', id: 'Nikmati pemandangan panorama Gunung Merapi' },
    'quest.tugu_pahlawan.title': { en: 'Surabaya Heroes Monument', id: 'Tugu Pahlawan Surabaya' },
    'quest.tugu_pahlawan.description': { en: 'Visit the iconic monument commemorating the Battle of Surabaya', id: 'Kunjungi monumen ikonik yang memperingati Pertempuran Surabaya' },
    'quest.sampoerna.title': { en: 'House of Sampoerna', id: 'House of Sampoerna' },
    'quest.sampoerna.description': { en: 'Explore the historic cigarette factory museum', id: 'Jelajahi museum pabrik rokok bersejarah' },
    'quest.submarine.title': { en: 'Surabaya Submarine Monument', id: 'Monumen Kapal Selam Surabaya' },
    'quest.submarine.description': { en: 'Visit the KRI Pasopati submarine museum', id: 'Kunjungi museum kapal selam KRI Pasopati' },
    'quest.surabaya_zoo.title': { en: 'Surabaya Zoo Adventure', id: 'Petualangan Kebun Binatang Surabaya' },
    'quest.surabaya_zoo.description': { en: 'Explore one of the largest zoos in Southeast Asia', id: 'Jelajahi salah satu kebun binatang terbesar di Asia Tenggara' },
    'quest.kenjeran.title': { en: 'Kenjeran Beach Sunset', id: 'Sunset Pantai Kenjeran' },
    'quest.kenjeran.description': { en: 'Watch sunset at Surabaya\'s popular beach', id: 'Saksikan sunset di pantai populer Surabaya' },
    'quest.lumpur_lapindo.title': { en: 'Sidoarjo Mud Volcano', id: 'Lumpur Lapindo Sidoarjo' },
    'quest.lumpur_lapindo.description': { en: 'Witness the famous Lapindo mud volcano phenomenon', id: 'Saksikan fenomena lumpur Lapindo yang terkenal' },
    'quest.pasar_udang.title': { en: 'Sidoarjo Shrimp Market', id: 'Pasar Udang Sidoarjo' },
    'quest.pasar_udang.description': { en: 'Experience the famous shrimp market of Sidoarjo', id: 'Rasakan pasar udang terkenal Sidoarjo' },
    'quest.delta_fishing.title': { en: 'Delta Fishing Sidoarjo', id: 'Delta Fishing Sidoarjo' },
    'quest.delta_fishing.description': { en: 'Enjoy fishing and seafood at Delta Fishing', id: 'Nikmati memancing dan seafood di Delta Fishing' },
    'quest.candi_pari.title': { en: 'Candi Pari Temple', id: 'Candi Pari' },
    'quest.candi_pari.description': { en: 'Visit the ancient Hindu temple in Sidoarjo', id: 'Kunjungi candi Hindu kuno di Sidoarjo' },
    'quest.kota_tua.title': { en: 'Kota Tua Old Town', id: 'Kota Tua Jakarta' },
    'quest.kota_tua.description': { en: 'Explore the historic Dutch colonial area', id: 'Jelajahi kawasan kolonial Belanda yang bersejarah' },

    // Quest Details - BALI
    'quest.tanah_lot.title': { en: 'Tanah Lot Temple', id: 'Pura Tanah Lot' },
    'quest.tanah_lot.description': { en: 'Visit the iconic sea temple at sunset', id: 'Kunjungi pura laut ikonik saat sunset' },
    'quest.tegallalang.title': { en: 'Ubud Rice Terraces', id: 'Sawah Terasering Ubud' },
    'quest.tegallalang.description': { en: 'Explore the stunning Tegallalang rice terraces', id: 'Jelajahi sawah terasering Tegallalang yang menakjubkan' },
    'quest.batur.title': { en: 'Mount Batur Sunrise Trek', id: 'Trekking Sunrise Gunung Batur' },
    'quest.batur.description': { en: 'Hike Mount Batur for a spectacular sunrise view', id: 'Mendaki Gunung Batur untuk pemandangan sunrise yang spektakuler' },
    'quest.uluwatu.title': { en: 'Uluwatu Temple Sunset', id: 'Sunset Pura Uluwatu' },
    'quest.uluwatu.description': { en: 'Watch Kecak dance at clifftop temple', id: 'Saksikan tari Kecak di pura tebing' },
    'quest.monkey_forest.title': { en: 'Ubud Monkey Forest', id: 'Hutan Monyet Ubud' },
    'quest.monkey_forest.description': { en: 'Explore sacred forest sanctuary', id: 'Jelajahi suaka hutan keramat' },
    'quest.kuta_beach.title': { en: 'Kuta Beach Surfing', id: 'Surfing Pantai Kuta' },
    'quest.kuta_beach.description': { en: 'Learn to surf at Bali\'s famous beach', id: 'Belajar surfing di pantai terkenal Bali' },
    'quest.seminyak.title': { en: 'Seminyak Shopping', id: 'Belanja di Seminyak' },
    'quest.seminyak.description': { en: 'Explore trendy boutiques and cafes', id: 'Jelajahi butik dan kafe trendi' },
    'quest.kelingking.title': { en: 'Nusa Penida Kelingking Beach', id: 'Pantai Kelingking Nusa Penida' },
    'quest.kelingking.description': { en: 'Visit the T-Rex shaped cliff viewpoint', id: 'Kunjungi tebing berbentuk T-Rex' },
    'quest.besakih.title': { en: 'Besakih Mother Temple', id: 'Pura Besakih' },
    'quest.besakih.description': { en: 'Visit Bali\'s largest Hindu temple', id: 'Kunjungi pura Hindu terbesar di Bali' },
    'quest.canggu.title': { en: 'Canggu Beach Vibes', id: 'Suasana Pantai Canggu' },
    'quest.canggu.description': { en: 'Experience the digital nomad hub', id: 'Rasakan pusat digital nomad' },
    'quest.nusa_lembongan.title': { en: 'Nusa Lembongan Diving', id: 'Diving Nusa Lembongan' },
    'quest.nusa_lembongan.description': { en: 'Dive with manta rays', id: 'Menyelam bersama pari manta' },
    'quest.jatiluwih.title': { en: 'Jatiluwih Rice Terraces', id: 'Sawah Terasering Jatiluwih' },
    'quest.jatiluwih.description': { en: 'UNESCO World Heritage rice fields', id: 'Sawah Warisan Dunia UNESCO' },

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
