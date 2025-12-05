// Comprehensive Indonesia Quest Database - 150+ Destinations
// This file contains quest data for GameContext.tsx

export const INDONESIA_QUESTS = {
    // SUMATRA - 20 quests
    'sumatra': [
        // North Sumatra
        { id: 'sum-001', title: 'Lake Toba Paradise', titleId: 'quest.lake_toba.title', location: { name: 'Lake Toba', lat: 2.6845, lng: 98.8756 }, reward: 150, difficulty: 'medium', type: 'visit', region: 'sumatra' },
        { id: 'sum-002', title: 'Bukit Lawang Orangutan Trek', titleId: 'quest.bukit_lawang.title', location: { name: 'Bukit Lawang', lat: 3.5547, lng: 98.1372 }, reward: 200, difficulty: 'hard', type: 'challenge', region: 'sumatra' },
        { id: 'sum-003', title: 'Medan Grand Mosque', titleId: 'quest.medan_mosque.title', location: { name: 'Medan', lat: 3.5952, lng: 98.6722 }, reward: 80, difficulty: 'easy', type: 'visit', region: 'sumatra' },
        { id: 'sum-004', title: 'Sipiso-piso Waterfall', titleId: 'quest.sipiso.title', location: { name: 'Sipiso-piso', lat: 2.9167, lng: 98.4833 }, reward: 120, difficulty: 'medium', type: 'photo', region: 'sumatra' },

        // Aceh
        { id: 'sum-005', title: 'Banda Aceh Tsunami Museum', titleId: 'quest.tsunami_museum.title', location: { name: 'Tsunami Museum', lat: 5.5483, lng: 95.3238 }, reward: 100, difficulty: 'easy', type: 'visit', region: 'sumatra' },
        { id: 'sum-006', title: 'Baiturrahman Grand Mosque', titleId: 'quest.baiturrahman.title', location: { name: 'Baiturrahman', lat: 5.5500, lng: 95.3200 }, reward: 90, difficulty: 'easy', type: 'visit', region: 'sumatra' },
        { id: 'sum-007', title: 'Sabang Beach Paradise', titleId: 'quest.sabang.title', location: { name: 'Sabang', lat: 5.8944, lng: 95.3222 }, reward: 180, difficulty: 'medium', type: 'visit', region: 'sumatra' },

        // West Sumatra
        { id: 'sum-008', title: 'Ngarai Sianok Canyon', titleId: 'quest.ngarai_sianok.title', location: { name: 'Ngarai Sianok', lat: -0.3051, lng: 100.3693 }, reward: 120, difficulty: 'medium', type: 'visit', region: 'sumatra' },
        { id: 'sum-009', title: 'Padang Beach Sunset', titleId: 'quest.padang_beach.title', location: { name: 'Padang Beach', lat: -0.9893, lng: 100.3633 }, reward: 90, difficulty: 'easy', type: 'photo', region: 'sumatra' },
        { id: 'sum-010', title: 'Jam Gadang Clock Tower', titleId: 'quest.jam_gadang.title', location: { name: 'Jam Gadang', lat: -0.3051, lng: 100.3693 }, reward: 70, difficulty: 'easy', type: 'visit', region: 'sumatra' },
        { id: 'sum-011', title: 'Harau Valley Trek', titleId: 'quest.harau.title', location: { name: 'Harau Valley', lat: -0.1167, lng: 100.6667 }, reward: 140, difficulty: 'medium', type: 'challenge', region: 'sumatra' },

        // Riau & Islands
        { id: 'sum-012', title: 'Pekanbaru Great Mosque', titleId: 'quest.pekanbaru_mosque.title', location: { name: 'Pekanbaru', lat: 0.5071, lng: 101.4478 }, reward: 75, difficulty: 'easy', type: 'visit', region: 'sumatra' },
        { id: 'sum-013', title: 'Batam Waterfront', titleId: 'quest.batam.title', location: { name: 'Batam', lat: 1.0456, lng: 104.0305 }, reward: 85, difficulty: 'easy', type: 'visit', region: 'sumatra' },
        { id: 'sum-014', title: 'Bintan Beach Resort', titleId: 'quest.bintan.title', location: { name: 'Bintan', lat: 1.1667, lng: 104.5000 }, reward: 130, difficulty: 'medium', type: 'visit', region: 'sumatra' },

        // South Sumatra & Lampung
        { id: 'sum-015', title: 'Ampera Bridge Palembang', titleId: 'quest.ampera_bridge.title', location: { name: 'Ampera Bridge', lat: -2.9900, lng: 104.7619 }, reward: 80, difficulty: 'easy', type: 'visit', region: 'sumatra' },
        { id: 'sum-016', title: 'Way Kambas Elephant Sanctuary', titleId: 'quest.way_kambas.title', location: { name: 'Way Kambas', lat: -4.9333, lng: 105.7667 }, reward: 150, difficulty: 'medium', type: 'visit', region: 'sumatra' },
        { id: 'sum-017', title: 'Krakatau Volcano Tour', titleId: 'quest.krakatau.title', location: { name: 'Krakatau', lat: -6.1021, lng: 105.4230 }, reward: 250, difficulty: 'hard', type: 'challenge', region: 'sumatra' },

        // Bengkulu & Jambi
        { id: 'sum-018', title: 'Kerinci Seblat National Park', titleId: 'quest.kerinci.title', location: { name: 'Kerinci', lat: -1.6969, lng: 101.2644 }, reward: 200, difficulty: 'hard', type: 'challenge', region: 'sumatra' },
        { id: 'sum-019', title: 'Mentawai Islands Surf', titleId: 'quest.mentawai.title', location: { name: 'Mentawai Islands', lat: -2.0853, lng: 99.6522 }, reward: 250, difficulty: 'hard', type: 'challenge', region: 'sumatra' },
        { id: 'sum-020', title: 'Nias Island Surfing', titleId: 'quest.nias_surf.title', location: { name: 'Nias Island', lat: 1.0833, lng: 97.6167 }, reward: 220, difficulty: 'hard', type: 'challenge', region: 'sumatra' },
    ],

    // JAVA - 30 quests (most populated island)
    'java': [
        // Jakarta
        { id: 'jv-001', title: 'Monas National Monument', titleId: 'quest.monas.title', location: { name: 'Monas', lat: -6.1754, lng: 106.8272 }, reward: 75, difficulty: 'easy', type: 'visit', region: 'java' },
        { id: 'jv-002', title: 'Istiqlal Mosque', titleId: 'quest.istiqlal.title', location: { name: 'Istiqlal', lat: -6.1701, lng: 106.8314 }, reward: 80, difficulty: 'easy', type: 'visit', region: 'java' },
        { id: 'jv-003', title: 'Kota Tua Old Town', titleId: 'quest.kota_tua.title', location: { name: 'Kota Tua', lat: -6.1352, lng: 106.8133 }, reward: 90, difficulty: 'easy', type: 'visit', region: 'java' },
        { id: 'jv-004', title: 'Ancol Beach', titleId: 'quest.ancol.title', location: { name: 'Ancol', lat: -6.1229, lng: 106.8418 }, reward: 70, difficulty: 'easy', type: 'visit', region: 'java' },
        { id: 'jv-005', title: 'Thousand Islands Diving', titleId: 'quest.pulau_seribu.title', location: { name: 'Pulau Seribu', lat: -5.6167, lng: 106.5833 }, reward: 160, difficulty: 'medium', type: 'challenge', region: 'java' },

        // West Java
        { id: 'jv-006', title: 'Tangkuban Perahu Volcano', titleId: 'quest.tangkuban_perahu.title', location: { name: 'Tangkuban Perahu', lat: -6.7597, lng: 107.6098 }, reward: 130, difficulty: 'medium', type: 'visit', region: 'java' },
        { id: 'jv-007', title: 'Bandung Gedung Sate', titleId: 'quest.gedung_sate.title', location: { name: 'Gedung Sate', lat: -6.9024, lng: 107.6186 }, reward: 75, difficulty: 'easy', type: 'visit', region: 'java' },
        { id: 'jv-008', title: 'Kawah Putih White Crater', titleId: 'quest.kawah_putih.title', location: { name: 'Kawah Putih', lat: -7.1661, lng: 107.4025 }, reward: 140, difficulty: 'medium', type: 'photo', region: 'java' },
        { id: 'jv-009', title: 'Green Canyon Pangandaran', titleId: 'quest.green_canyon.title', location: { name: 'Green Canyon', lat: -7.6833, lng: 108.6500 }, reward: 150, difficulty: 'medium', type: 'visit', region: 'java' },
        { id: 'jv-010', title: 'Ujung Kulon National Park', titleId: 'quest.ujung_kulon.title', location: { name: 'Ujung Kulon', lat: -6.7608, lng: 105.3361 }, reward: 200, difficulty: 'hard', type: 'challenge', region: 'java' },

        // Central Java
        { id: 'jv-011', title: 'Borobudur Temple Sunrise', titleId: 'quest.borobudur.title', location: { name: 'Borobudur', lat: -7.6079, lng: 110.2038 }, reward: 200, difficulty: 'medium', type: 'visit', region: 'java' },
        { id: 'jv-012', title: 'Prambanan Temple Complex', titleId: 'quest.prambanan.title', location: { name: 'Prambanan', lat: -7.7520, lng: 110.4915 }, reward: 150, difficulty: 'easy', type: 'visit', region: 'java' },
        { id: 'jv-013', title: 'Yogyakarta Kraton Palace', titleId: 'quest.kraton.title', location: { name: 'Kraton', lat: -7.8053, lng: 110.3642 }, reward: 90, difficulty: 'easy', type: 'visit', region: 'java' },
        { id: 'jv-014', title: 'Malioboro Street Shopping', titleId: 'quest.malioboro.title', location: { name: 'Malioboro', lat: -7.7928, lng: 110.3653 }, reward: 60, difficulty: 'easy', type: 'visit', region: 'java' },
        { id: 'jv-015', title: 'Dieng Plateau Trek', titleId: 'quest.dieng.title', location: { name: 'Dieng', lat: -7.2000, lng: 109.9167 }, reward: 170, difficulty: 'medium', type: 'challenge', region: 'java' },
        { id: 'jv-016', title: 'Semarang Lawang Sewu', titleId: 'quest.lawang_sewu.title', location: { name: 'Lawang Sewu', lat: -6.9837, lng: 110.4106 }, reward: 85, difficulty: 'easy', type: 'visit', region: 'java' },
        { id: 'jv-017', title: 'Solo Kasunanan Palace', titleId: 'quest.solo_palace.title', location: { name: 'Solo Palace', lat: -7.5755, lng: 110.8243 }, reward: 80, difficulty: 'easy', type: 'visit', region: 'java' },

        // East Java
        { id: 'jv-018', title: 'Mount Bromo Sunrise', titleId: 'quest.bromo.title', location: { name: 'Mount Bromo', lat: -7.9425, lng: 112.9530 }, reward: 200, difficulty: 'hard', type: 'challenge', region: 'java' },
        { id: 'jv-019', title: 'Ijen Blue Fire', titleId: 'quest.ijen.title', location: { name: 'Mount Ijen', lat: -8.0583, lng: 114.2425 }, reward: 250, difficulty: 'hard', type: 'challenge', region: 'java' },
        { id: 'jv-020', title: 'Surabaya Heroes Monument', titleId: 'quest.tugu_pahlawan.title', location: { name: 'Tugu Pahlawan', lat: -7.2459, lng: 112.7378 }, reward: 70, difficulty: 'easy', type: 'visit', region: 'java' },
        { id: 'jv-021', title: 'Malang City Square', titleId: 'quest.malang.title', location: { name: 'Malang', lat: -7.9797, lng: 112.6304 }, reward: 65, difficulty: 'easy', type: 'visit', region: 'java' },
        { id: 'jv-022', title: 'Batu Night Spectacular', titleId: 'quest.batu.title', location: { name: 'Batu', lat: -7.8700, lng: 112.5200 }, reward: 90, difficulty: 'easy', type: 'visit', region: 'java' },
        { id: 'jv-023', title: 'Trowulan Majapahit Ruins', titleId: 'quest.trowulan.title', location: { name: 'Trowulan', lat: -7.5667, lng: 112.3833 }, reward: 110, difficulty: 'medium', type: 'visit', region: 'java' },
        { id: 'jv-024', title: 'Madura Bull Racing', titleId: 'quest.madura.title', location: { name: 'Madura', lat: -7.0167, lng: 113.3833 }, reward: 140, difficulty: 'medium', type: 'challenge', region: 'java' },
        { id: 'jv-025', title: 'Baluran National Park Safari', titleId: 'quest.baluran.title', location: { name: 'Baluran', lat: -7.8500, lng: 114.3667 }, reward: 160, difficulty: 'medium', type: 'visit', region: 'java' },
        { id: 'jv-026', title: 'Banyuwangi Ijen Crater', titleId: 'quest.banyuwangi.title', location: { name: 'Banyuwangi', lat: -8.2192, lng: 114.3691 }, reward: 130, difficulty: 'medium', type: 'visit', region: 'java' },
        { id: 'jv-027', title: 'Jember Fashion Carnival', titleId: 'quest.jember.title', location: { name: 'Jember', lat: -3.3333, lng: 113.7000 }, reward: 100, difficulty: 'easy', type: 'social', region: 'java' },
        { id: 'jv-028', title: 'Probolinggo City Tour', titleId: 'quest.probolinggo.title', location: { name: 'Probolinggo', lat: -7.7543, lng: 113.2159 }, reward: 60, difficulty: 'easy', type: 'visit', region: 'java' },
        { id: 'jv-029', title: 'Semeru Mountain Base Camp', titleId: 'quest.semeru.title', location: { name: 'Semeru', lat: -8.1077, lng: 112.9225 }, reward: 220, difficulty: 'hard', type: 'challenge', region: 'java' },
        { id: 'jv-030', title: 'Karimunjawa Islands', titleId: 'quest.karimunjawa.title', location: { name: 'Karimunjawa', lat: -5.8167, lng: 110.4500 }, reward: 180, difficulty: 'medium', type: 'visit', region: 'java' },
    ],
};

// Continue in next file due to size...
