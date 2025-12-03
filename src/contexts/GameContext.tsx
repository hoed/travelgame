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

    const [currentRegion, setCurrentRegion] = useState('east-java');
    const [quests, setQuests] = useState<Quest[]>([]);
    const [achievements, setAchievements] = useState<Achievement[]>([]);

    // Initialize quests based on region
    useEffect(() => {
        loadQuestsForRegion(currentRegion);
        loadAchievements();
    }, [currentRegion]);

    const loadQuestsForRegion = (_region: string) => {
        // Sample quests for East Java/Sidoarjo
        const eastJavaQuests: Quest[] = [
            {
                id: 'ej-001',
                title: 'Visit Candi Pari',
                titleId: 'quest.candi_pari.title',
                description: 'Explore the ancient Candi Pari temple in Sidoarjo',
                descriptionId: 'quest.candi_pari.description',
                location: { name: 'Candi Pari', lat: -7.4479, lng: 112.7186 },
                reward: 50,
                difficulty: 'easy',
                type: 'visit',
                completed: false,
                region: 'east-java',
            },
            {
                id: 'ej-002',
                title: 'Delta Fishing Village',
                titleId: 'quest.delta_fishing.title',
                description: 'Visit the traditional fishing village and take a photo with local fishermen',
                descriptionId: 'quest.delta_fishing.description',
                location: { name: 'Delta Fishing Village', lat: -7.3753, lng: 112.7186 },
                reward: 75,
                difficulty: 'medium',
                type: 'photo',
                completed: false,
                region: 'east-java',
            },
            {
                id: 'ej-003',
                title: 'Tanggulangin Leather Center',
                titleId: 'quest.tanggulangin.title',
                description: 'Explore the famous leather craft center and share your experience',
                descriptionId: 'quest.tanggulangin.description',
                location: { name: 'Tanggulangin', lat: -7.5000, lng: 112.6833 },
                reward: 100,
                difficulty: 'medium',
                type: 'social',
                completed: false,
                region: 'east-java',
            },
            {
                id: 'ej-004',
                title: 'Mount Bromo Sunrise',
                titleId: 'quest.bromo.title',
                description: 'Witness the legendary sunrise at Mount Bromo',
                descriptionId: 'quest.bromo.description',
                location: { name: 'Mount Bromo', lat: -7.9425, lng: 112.9530 },
                reward: 200,
                difficulty: 'hard',
                type: 'challenge',
                completed: false,
                region: 'east-java',
            },
            {
                id: 'ej-005',
                title: 'Surabaya Heroes Monument',
                titleId: 'quest.tugu_pahlawan.title',
                description: 'Visit the iconic Tugu Pahlawan in Surabaya',
                descriptionId: 'quest.tugu_pahlawan.description',
                location: { name: 'Tugu Pahlawan', lat: -7.2459, lng: 112.7378 },
                reward: 60,
                difficulty: 'easy',
                type: 'visit',
                completed: false,
                region: 'east-java',
            },
        ];

        setQuests(eastJavaQuests);
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
                description: 'Earn 500 TOUR tokens',
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
