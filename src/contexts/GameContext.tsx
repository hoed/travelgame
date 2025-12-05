import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface Quest {
    id: string;
    title: string;
    titleId: string;
    description: string;
    descriptionId: string;
    location: {
        name: string;
        lat: number;
        lng: number;
    };
    reward: number;
    difficulty: 'easy' | 'medium' | 'hard';
    type: 'visit' | 'photo' | 'challenge' | 'social';
    completed: boolean;
    region: string;
    distance?: number;
}

interface Achievement {
    id: string;
    name: string;
    nameId: string;
    description: string;
    descriptionId: string;
    icon: string;
    unlocked: boolean;
    unlockedAt?: Date;
}

interface UserStats {
    level: number;
    xp: number;
    xpToNextLevel: number;
    tokensEarned: number;
    placesVisited: number;
    questsCompleted: number;
    streak: number;
    rank: number;
}

interface GameContextType {
    userStats: UserStats;
    quests: Quest[];
    achievements: Achievement[];
    currentRegion: string;
    setCurrentRegion: (region: string) => void;
    completeQuest: (questId: string) => void;
    checkInLocation: (locationId: string, lat: number, lng: number) => Promise<boolean>;
    earnTokens: (amount: number, reason: string) => void;
    unlockAchievement: (achievementId: string) => void;
    updateUserLocation: (lat: number, lng: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within GameProvider');
    }
    return context;
};

interface GameProviderProps {
    children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [userStats, setUserStats] = useState<UserStats>({
        level: 1,
        xp: 0,
        xpToNextLevel: 100,
        tokensEarned: 0,
        placesVisited: 0,
        questsCompleted: 0,
        streak: 0,
        rank: 0,
    });

    const [currentRegion, setCurrentRegion] = useState('java');
    const [quests, setQuests] = useState<Quest[]>([]);
    const [achievements, setAchievements] = useState<Achievement[]>([]);

    // Initialize quests based on region
    useEffect(() => {
        loadQuestsForRegion(currentRegion);
        loadAchievements();
    }, [currentRegion]);

    const loadQuestsForRegion = (region: string) => {
        // Comprehensive quests across Indonesia from Sumatra to Papua
        const allQuests: Record<string, Quest[]> = {
            // SUMATRA
            'sumatra': [
                {
                    id: 'sum-001',
                    title: 'Lake Toba Paradise',
                    titleId: 'quest.lake_toba.title',
                    description: 'Visit the largest volcanic lake in the world and explore Samosir Island',
                    descriptionId: 'quest.lake_toba.description',
                    location: { name: 'Lake Toba', lat: 2.6845, lng: 98.8756 },
                    reward: 150,
                    difficulty: 'medium',
                    type: 'visit',
                    completed: false,
                    region: 'sumatra',
                },
                {
                    id: 'sum-002',
                    title: 'Bukit Lawang Orangutan Trek',
                    titleId: 'quest.bukit_lawang.title',
                    description: 'Trek through the rainforest and spot wild orangutans',
                    descriptionId: 'quest.bukit_lawang.description',
                    location: { name: 'Bukit Lawang', lat: 3.5547, lng: 98.1372 },
                    reward: 200,
                    difficulty: 'hard',
                    type: 'challenge',
                    completed: false,
                    region: 'sumatra',
                },
                {
                    id: 'sum-003',
                    title: 'Banda Aceh Tsunami Museum',
                    titleId: 'quest.tsunami_museum.title',
                    description: 'Learn about the 2004 tsunami at this memorial museum',
                    descriptionId: 'quest.tsunami_museum.description',
                    location: { name: 'Tsunami Museum', lat: 5.5483, lng: 95.3238 },
                    reward: 100,
                    difficulty: 'easy',
                    type: 'visit',
                    completed: false,
                    region: 'sumatra',
                },
                {
                    id: 'sum-004',
                    title: 'Mentawai Islands Surf',
                    titleId: 'quest.mentawai.title',
                    description: 'Experience world-class surfing in the Mentawai Islands',
                    descriptionId: 'quest.mentawai.description',
                    location: { name: 'Mentawai Islands', lat: -2.0853, lng: 99.6522 },
                    reward: 250,
                    difficulty: 'hard',
                    type: 'challenge',
                    completed: false,
                    region: 'sumatra',
                },
                {
                    id: 'sum-005',
                    title: 'Ngarai Sianok Canyon',
                    titleId: 'quest.ngarai_sianok.title',
                    description: 'Explore the stunning canyon in Bukittinggi',
                    descriptionId: 'quest.ngarai_sianok.description',
                    location: { name: 'Ngarai Sianok', lat: -0.3051, lng: 100.3693 },
                    reward: 120,
                    difficulty: 'medium',
                    type: 'visit',
                    completed: false,
                    region: 'sumatra',
                },
                {
                    id: 'sum-006',
                    title: 'Ampera Bridge Palembang',
                    titleId: 'quest.ampera_bridge.title',
                    description: 'Visit the iconic bridge over Musi River',
                    descriptionId: 'quest.ampera_bridge.description',
                    location: { name: 'Ampera Bridge', lat: -2.9900, lng: 104.7619 },
                    reward: 80,
                    difficulty: 'easy',
                    type: 'visit',
                    completed: false,
                    region: 'sumatra',
                },
                {
                    id: 'sum-007',
                    title: 'Nias Island Surfing',
                    titleId: 'quest.nias_surf.title',
                    description: 'Ride the legendary waves of Nias',
                    descriptionId: 'quest.nias_surf.description',
                    location: { name: 'Nias Island', lat: 1.0833, lng: 97.6167 },
                    reward: 220,
                    difficulty: 'hard',
                    type: 'challenge',
                    completed: false,
                    region: 'sumatra',
                },
                {
                    id: 'sum-008',
                    title: 'Padang Beach Sunset',
                    titleId: 'quest.padang_beach.title',
                    description: 'Watch sunset at Air Manis Beach',
                    descriptionId: 'quest.padang_beach.description',
                    location: { name: 'Padang Beach', lat: -0.9893, lng: 100.3633 },
                    reward: 90,
                    difficulty: 'easy',
                    type: 'photo',
                    completed: false,
                    region: 'sumatra',
                },
                {
                    id: 'sum-009',
                    title: 'Kerinci Seblat National Park',
                    titleId: 'quest.kerinci.title',
                    description: 'Trek through pristine rainforest',
                    descriptionId: 'quest.kerinci.description',
                    location: { name: 'Kerinci', lat: -1.6969, lng: 101.2644 },
                    reward: 200,
                    difficulty: 'hard',
                    type: 'challenge',
                    completed: false,
                    region: 'sumatra',
                },
                {
                    id: 'sum-010',
                    title: 'Way Kambas Elephant Sanctuary',
                    titleId: 'quest.way_kambas.title',
                    description: 'Meet Sumatran elephants in their sanctuary',
                    descriptionId: 'quest.way_kambas.description',
                    location: { name: 'Way Kambas', lat: -4.9333, lng: 105.7667 },
                    reward: 150,
                    difficulty: 'medium',
                    type: 'visit',
                    completed: false,
                    region: 'sumatra',
                },
            ],

            // JAVA
            'java': [
                {
                    id: 'jv-001',
                    title: 'Borobudur Temple Sunrise',
                    titleId: 'quest.borobudur.title',
                    description: 'Witness sunrise at the world\'s largest Buddhist temple',
                    descriptionId: 'quest.borobudur.description',
                    location: { name: 'Borobudur', lat: -7.6079, lng: 110.2038 },
                    reward: 200,
                    difficulty: 'medium',
                    type: 'visit',
                    completed: false,
                    region: 'java',
                },
                {
                    id: 'jv-002',
                    title: 'Prambanan Temple Complex',
                    titleId: 'quest.prambanan.title',
                    description: 'Explore the magnificent Hindu temple complex',
                    descriptionId: 'quest.prambanan.description',
                    location: { name: 'Prambanan', lat: -7.7520, lng: 110.4915 },
                    reward: 150,
                    difficulty: 'easy',
                    type: 'visit',
                    completed: false,
                    region: 'java',
                },
                {
                    id: 'jv-003',
                    title: 'Mount Bromo Sunrise',
                    titleId: 'quest.bromo.title',
                    description: 'Witness the legendary sunrise at Mount Bromo',
                    descriptionId: 'quest.bromo.description',
                    location: { name: 'Mount Bromo', lat: -7.9425, lng: 112.9530 },
                    reward: 200,
                    difficulty: 'hard',
                    type: 'challenge',
                    completed: false,
                    region: 'java',
                },
                {
                    id: 'jv-004',
                    title: 'Ijen Blue Fire',
                    titleId: 'quest.ijen.title',
                    description: 'Trek to see the mystical blue fire phenomenon',
                    descriptionId: 'quest.ijen.description',
                    location: { name: 'Mount Ijen', lat: -8.0583, lng: 114.2425 },
                    reward: 250,
                    difficulty: 'hard',
                    type: 'challenge',
                    completed: false,
                    region: 'java',
                },
                {
                    id: 'jv-005',
                    title: 'Jakarta National Monument',
                    titleId: 'quest.monas.title',
                    description: 'Visit Monas, the iconic symbol of Indonesian independence',
                    descriptionId: 'quest.monas.description',
                    location: { name: 'Monas', lat: -6.1754, lng: 106.8272 },
                    reward: 75,
                    difficulty: 'easy',
                    type: 'visit',
                    completed: false,
                    region: 'java',
                },
            ],

            // BALI
            'bali': [
                {
                    id: 'bal-001',
                    title: 'Tanah Lot Temple',
                    titleId: 'quest.tanah_lot.title',
                    description: 'Visit the iconic sea temple at sunset',
                    descriptionId: 'quest.tanah_lot.description',
                    location: { name: 'Tanah Lot', lat: -8.6211, lng: 115.0868 },
                    reward: 100,
                    difficulty: 'easy',
                    type: 'visit',
                    completed: false,
                    region: 'bali',
                },
                {
                    id: 'bal-002',
                    title: 'Ubud Rice Terraces',
                    titleId: 'quest.tegallalang.title',
                    description: 'Explore the stunning Tegallalang rice terraces',
                    descriptionId: 'quest.tegallalang.description',
                    location: { name: 'Tegallalang', lat: -8.4339, lng: 115.2772 },
                    reward: 120,
                    difficulty: 'medium',
                    type: 'photo',
                    completed: false,
                    region: 'bali',
                },
                {
                    id: 'bal-003',
                    title: 'Mount Batur Sunrise Trek',
                    titleId: 'quest.batur.title',
                    description: 'Hike Mount Batur for a spectacular sunrise view',
                    descriptionId: 'quest.batur.description',
                    location: { name: 'Mount Batur', lat: -8.2421, lng: 115.3753 },
                    reward: 180,
                    difficulty: 'hard',
                    type: 'challenge',
                    completed: false,
                    region: 'bali',
                },
            ],

            // KALIMANTAN
            'kalimantan': [
                {
                    id: 'kal-001',
                    title: 'Tanjung Puting Orangutan',
                    titleId: 'quest.tanjung_puting.title',
                    description: 'Cruise through the jungle and meet orangutans',
                    descriptionId: 'quest.tanjung_puting.description',
                    location: { name: 'Tanjung Puting', lat: -2.7478, lng: 111.7294 },
                    reward: 250,
                    difficulty: 'hard',
                    type: 'challenge',
                    completed: false,
                    region: 'kalimantan',
                },
                {
                    id: 'kal-002',
                    title: 'Derawan Islands Diving',
                    titleId: 'quest.derawan.title',
                    description: 'Dive with manta rays and sea turtles',
                    descriptionId: 'quest.derawan.description',
                    location: { name: 'Derawan Islands', lat: 2.2833, lng: 118.2500 },
                    reward: 200,
                    difficulty: 'medium',
                    type: 'challenge',
                    completed: false,
                    region: 'kalimantan',
                },
                {
                    id: 'kal-003',
                    title: 'Dayak Longhouse Visit',
                    titleId: 'quest.dayak_longhouse.title',
                    description: 'Experience traditional Dayak culture in a longhouse',
                    descriptionId: 'quest.dayak_longhouse.description',
                    location: { name: 'Dayak Longhouse', lat: 0.5387, lng: 117.1333 },
                    reward: 150,
                    difficulty: 'medium',
                    type: 'social',
                    completed: false,
                    region: 'kalimantan',
                },
            ],

            // SULAWESI
            'sulawesi': [
                {
                    id: 'sul-001',
                    title: 'Bunaken Marine Park',
                    titleId: 'quest.bunaken.title',
                    description: 'Snorkel in one of Indonesia\'s best marine parks',
                    descriptionId: 'quest.bunaken.description',
                    location: { name: 'Bunaken', lat: 1.6167, lng: 124.7667 },
                    reward: 180,
                    difficulty: 'medium',
                    type: 'challenge',
                    completed: false,
                    region: 'sulawesi',
                },
                {
                    id: 'sul-002',
                    title: 'Toraja Funeral Ceremony',
                    titleId: 'quest.toraja.title',
                    description: 'Witness the unique Toraja funeral traditions',
                    descriptionId: 'quest.toraja.description',
                    location: { name: 'Tana Toraja', lat: -2.9833, lng: 119.8833 },
                    reward: 200,
                    difficulty: 'hard',
                    type: 'social',
                    completed: false,
                    region: 'sulawesi',
                },
                {
                    id: 'sul-003',
                    title: 'Togean Islands Paradise',
                    titleId: 'quest.togean.title',
                    description: 'Explore the pristine Togean Islands',
                    descriptionId: 'quest.togean.description',
                    location: { name: 'Togean Islands', lat: -0.4167, lng: 121.8833 },
                    reward: 220,
                    difficulty: 'hard',
                    type: 'visit',
                    completed: false,
                    region: 'sulawesi',
                },
            ],

            // NUSA TENGGARA
            'nusa-tenggara': [
                {
                    id: 'nt-001',
                    title: 'Komodo Dragon Encounter',
                    titleId: 'quest.komodo.title',
                    description: 'See the legendary Komodo dragons in their natural habitat',
                    descriptionId: 'quest.komodo.description',
                    location: { name: 'Komodo Island', lat: -8.5594, lng: 119.4883 },
                    reward: 300,
                    difficulty: 'hard',
                    type: 'challenge',
                    completed: false,
                    region: 'nusa-tenggara',
                },
                {
                    id: 'nt-002',
                    title: 'Pink Beach Paradise',
                    titleId: 'quest.pink_beach.title',
                    description: 'Visit the rare pink sand beach',
                    descriptionId: 'quest.pink_beach.description',
                    location: { name: 'Pink Beach', lat: -8.6500, lng: 119.5833 },
                    reward: 150,
                    difficulty: 'medium',
                    type: 'photo',
                    completed: false,
                    region: 'nusa-tenggara',
                },
                {
                    id: 'nt-003',
                    title: 'Mount Rinjani Summit',
                    titleId: 'quest.rinjani.title',
                    description: 'Conquer the second highest volcano in Indonesia',
                    descriptionId: 'quest.rinjani.description',
                    location: { name: 'Mount Rinjani', lat: -8.4114, lng: 116.4572 },
                    reward: 350,
                    difficulty: 'hard',
                    type: 'challenge',
                    completed: false,
                    region: 'nusa-tenggara',
                },
            ],

            // MALUKU
            'maluku': [
                {
                    id: 'mal-001',
                    title: 'Banda Islands Spice Route',
                    titleId: 'quest.banda.title',
                    description: 'Explore the historic Spice Islands',
                    descriptionId: 'quest.banda.description',
                    location: { name: 'Banda Islands', lat: -4.5167, lng: 129.9000 },
                    reward: 250,
                    difficulty: 'hard',
                    type: 'visit',
                    completed: false,
                    region: 'maluku',
                },
                {
                    id: 'mal-002',
                    title: 'Ambon Bay Diving',
                    titleId: 'quest.ambon.title',
                    description: 'Discover rare marine life in Ambon Bay',
                    descriptionId: 'quest.ambon.description',
                    location: { name: 'Ambon Bay', lat: -3.6954, lng: 128.1814 },
                    reward: 200,
                    difficulty: 'medium',
                    type: 'challenge',
                    completed: false,
                    region: 'maluku',
                },
            ],

            // PAPUA
            'papua': [
                {
                    id: 'pap-001',
                    title: 'Raja Ampat Diving',
                    titleId: 'quest.raja_ampat.title',
                    description: 'Dive in the world\'s most biodiverse marine ecosystem',
                    descriptionId: 'quest.raja_ampat.description',
                    location: { name: 'Raja Ampat', lat: -0.2333, lng: 130.5167 },
                    reward: 400,
                    difficulty: 'hard',
                    type: 'challenge',
                    completed: false,
                    region: 'papua',
                },
                {
                    id: 'pap-002',
                    title: 'Baliem Valley Trek',
                    titleId: 'quest.baliem.title',
                    description: 'Trek through the highlands and meet the Dani tribe',
                    descriptionId: 'quest.baliem.description',
                    location: { name: 'Baliem Valley', lat: -3.9667, lng: 138.9500 },
                    reward: 350,
                    difficulty: 'hard',
                    type: 'challenge',
                    completed: false,
                    region: 'papua',
                },
                {
                    id: 'pap-003',
                    title: 'Carstensz Pyramid Base',
                    titleId: 'quest.carstensz.title',
                    description: 'Trek to the base of Indonesia\'s highest peak',
                    descriptionId: 'quest.carstensz.description',
                    location: { name: 'Carstensz Pyramid', lat: -4.0833, lng: 137.1833 },
                    reward: 500,
                    difficulty: 'hard',
                    type: 'challenge',
                    completed: false,
                    region: 'papua',
                },
            ],
        };

        // Set quests based on region, default to Java if region not found
        setQuests(allQuests[region] || allQuests['java']);
    };

    const loadAchievements = () => {
        const initialAchievements: Achievement[] = [
            {
                id: 'ach-001',
                name: 'First Steps',
                nameId: 'achievement.first_steps.name',
                description: 'Complete your first quest',
                descriptionId: 'achievement.first_steps.description',
                icon: '🎯',
                unlocked: false,
            },
            {
                id: 'ach-002',
                name: 'Explorer',
                nameId: 'achievement.explorer.name',
                description: 'Visit 5 different locations',
                descriptionId: 'achievement.explorer.description',
                icon: '🗺️',
                unlocked: false,
            },
            {
                id: 'ach-003',
                name: 'Social Butterfly',
                nameId: 'achievement.social_butterfly.name',
                description: 'Share 3 experiences on social media',
                descriptionId: 'achievement.social_butterfly.description',
                icon: '🦋',
                unlocked: false,
            },
            {
                id: 'ach-004',
                name: 'Token Collector',
                nameId: 'achievement.token_collector.name',
                description: 'Earn 500 SMT tokens',
                descriptionId: 'achievement.token_collector.description',
                icon: '💰',
                unlocked: false,
            },
            {
                id: 'ach-005',
                name: 'Week Warrior',
                nameId: 'achievement.week_warrior.name',
                description: 'Maintain a 7-day streak',
                descriptionId: 'achievement.week_warrior.description',
                icon: '🔥',
                unlocked: false,
            },
        ];

        setAchievements(initialAchievements);
    };

    const completeQuest = (questId: string) => {
        setQuests((prev) =>
            prev.map((quest) =>
                quest.id === questId ? { ...quest, completed: true } : quest
            )
        );

        const quest = quests.find((q) => q.id === questId);
        if (quest) {
            earnTokens(quest.reward, `Completed quest: ${quest.title}`);

            setUserStats((prev) => {
                const newXp = prev.xp + quest.reward;
                const newLevel = Math.floor(newXp / 100) + 1;

                return {
                    ...prev,
                    xp: newXp,
                    level: newLevel,
                    xpToNextLevel: newLevel * 100,
                    questsCompleted: prev.questsCompleted + 1,
                };
            });

            // Check for achievements
            if (userStats.questsCompleted === 0) {
                unlockAchievement('ach-001');
            }
        }
    };

    const checkInLocation = async (
        locationId: string,
        lat: number,
        lng: number
    ): Promise<boolean> => {
        // Find the quest/location
        const quest = quests.find((q) => q.id === locationId);
        if (!quest) return false;

        // Calculate distance
        const distance = calculateDistance(
            lat,
            lng,
            quest.location.lat,
            quest.location.lng
        );

        // Check if within 100 meters
        if (distance <= 0.1) {
            setUserStats((prev) => ({
                ...prev,
                placesVisited: prev.placesVisited + 1,
            }));

            // Check explorer achievement
            if (userStats.placesVisited + 1 >= 5) {
                unlockAchievement('ach-002');
            }

            return true;
        }

        return false;
    };

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

    const earnTokens = (amount: number, reason: string) => {
        setUserStats((prev) => ({
            ...prev,
            tokensEarned: prev.tokensEarned + amount,
        }));

        // Check token collector achievement
        if (userStats.tokensEarned + amount >= 500) {
            unlockAchievement('ach-004');
        }

        // Log to backend/blockchain
        console.log(`Earned ${amount} tokens: ${reason}`);
    };

    const unlockAchievement = (achievementId: string) => {
        setAchievements((prev) =>
            prev.map((ach) =>
                ach.id === achievementId
                    ? { ...ach, unlocked: true, unlockedAt: new Date() }
                    : ach
            )
        );
    };

    const updateUserLocation = (lat: number, lng: number) => {
        // Update quest distances
        setQuests((prev) =>
            prev.map((quest) => ({
                ...quest,
                distance: calculateDistance(lat, lng, quest.location.lat, quest.location.lng),
            }))
        );
    };

    const value: GameContextType = {
        userStats,
        quests,
        achievements,
        currentRegion,
        setCurrentRegion,
        completeQuest,
        checkInLocation,
        earnTokens,
        unlockAchievement,
        updateUserLocation,
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
