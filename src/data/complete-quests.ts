// COMPREHENSIVE INDONESIA QUEST DATA - 68 Destinations
// Includes Popular destinations and Hidden Gems across all regions

export const COMPLETE_QUEST_DATA = [
    // SUMATERA UTARA - 4 quests
    { id: 'sum-001', titleId: 'quest.danau_toba.title', location: { name: 'Danau Toba & Samosir', lat: 2.6845, lng: 98.8756 }, reward: 150, difficulty: 'medium', type: 'visit', region: 'sumatra', isPopular: true },
    { id: 'sum-002', titleId: 'quest.sipiso_piso.title', location: { name: 'Air Terjun Sipiso-piso', lat: 2.9167, lng: 98.4833 }, reward: 120, difficulty: 'medium', type: 'photo', region: 'sumatra', isPopular: true },
    { id: 'sum-003', titleId: 'quest.efrata.title', location: { name: 'Air Terjun Efrata', lat: 2.8500, lng: 98.5000 }, reward: 140, difficulty: 'medium', type: 'challenge', region: 'sumatra', isPopular: false },
    { id: 'sum-004', titleId: 'quest.tao_silalahi.title', location: { name: 'Tao Silalahi', lat: 2.6500, lng: 98.9000 }, reward: 130, difficulty: 'medium', type: 'visit', region: 'sumatra', isPopular: false },

    // ACEH - 2 quests
    { id: 'ace-001', titleId: 'quest.pantai_iboih.title', location: { name: 'Pantai Iboih', lat: 5.8833, lng: 95.2667 }, reward: 160, difficulty: 'medium', type: 'visit', region: 'sumatra', isPopular: true },
    { id: 'ace-002', titleId: 'quest.pria_laot.title', location: { name: 'Air Terjun Pria Laot', lat: 5.5000, lng: 95.4000 }, reward: 150, difficulty: 'hard', type: 'challenge', region: 'sumatra', isPopular: false },

    // SUMATERA BARAT - 2 quests
    { id: 'smb-001', titleId: 'quest.ngarai_sianok.title', location: { name: 'Ngarai Sianok', lat: -0.3051, lng: 100.3693 }, reward: 120, difficulty: 'medium', type: 'visit', region: 'sumatra', isPopular: true },
    { id: 'smb-002', titleId: 'quest.pariangan.title', location: { name: 'Desa Wisata Pariangan', lat: -0.4500, lng: 100.3000 }, reward: 110, difficulty: 'easy', type: 'visit', region: 'sumatra', isPopular: false },

    // DKI JAKARTA - 2 quests
    { id: 'jkt-001', titleId: 'quest.kota_tua.title', location: { name: 'Kota Tua', lat: -6.1352, lng: 106.8133 }, reward: 90, difficulty: 'easy', type: 'visit', region: 'java', isPopular: true },
    { id: 'jkt-002', titleId: 'quest.mangrove_pik.title', location: { name: 'Hutan Mangrove PIK', lat: -6.1100, lng: 106.7400 }, reward: 100, difficulty: 'easy', type: 'visit', region: 'java', isPopular: false },

    // JAWA BARAT - 2 quests
    { id: 'jab-001', titleId: 'quest.kawah_putih.title', location: { name: 'Kawah Putih', lat: -7.1661, lng: 107.4025 }, reward: 140, difficulty: 'medium', type: 'photo', region: 'java', isPopular: true },
    { id: 'jab-002', titleId: 'quest.sanghyang_heuleut.title', location: { name: 'Sanghyang Heuleut', lat: -7.2000, lng: 107.5000 }, reward: 160, difficulty: 'hard', type: 'challenge', region: 'java', isPopular: false },

    // JAWA TENGAH - 2 quests
    { id: 'jat-001', titleId: 'quest.borobudur.title', location: { name: 'Candi Borobudur', lat: -7.6079, lng: 110.2038 }, reward: 200, difficulty: 'medium', type: 'visit', region: 'java', isPopular: true },
    { id: 'jat-002', titleId: 'quest.gunung_prau.title', location: { name: 'Gunung Prau', lat: -7.1833, lng: 109.9167 }, reward: 180, difficulty: 'hard', type: 'challenge', region: 'java', isPopular: false },

    // YOGYAKARTA - 2 quests
    { id: 'yog-001', titleId: 'quest.malioboro.title', location: { name: 'Malioboro', lat: -7.7928, lng: 110.3653 }, reward: 60, difficulty: 'easy', type: 'visit', region: 'java', isPopular: true },
    { id: 'yog-002', titleId: 'quest.goa_jomblang.title', location: { name: 'Goa Jomblang', lat: -7.9500, lng: 110.6500 }, reward: 190, difficulty: 'hard', type: 'challenge', region: 'java', isPopular: false },

    // JAWA TIMUR - 2 quests
    { id: 'jat-003', titleId: 'quest.bromo.title', location: { name: 'Gunung Bromo', lat: -7.9425, lng: 112.9530 }, reward: 200, difficulty: 'hard', type: 'challenge', region: 'java', isPopular: true },
    { id: 'jat-004', titleId: 'quest.tumpak_sewu.title', location: { name: 'Tumpak Sewu', lat: -8.2333, lng: 112.9000 }, reward: 220, difficulty: 'hard', type: 'photo', region: 'java', isPopular: false },

    // KALIMANTAN TIMUR - 2 quests
    { id: 'kal-001', titleId: 'quest.labuan_cermin.title', location: { name: 'Danau Labuan Cermin', lat: 2.4000, lng: 117.6000 }, reward: 180, difficulty: 'medium', type: 'visit', region: 'kalimantan', isPopular: true },
    { id: 'kal-002', titleId: 'quest.goa_haji_mangku.title', location: { name: 'Goa Haji Mangku', lat: 1.0000, lng: 116.8000 }, reward: 150, difficulty: 'medium', type: 'challenge', region: 'kalimantan', isPopular: false },

    // SULAWESI SELATAN - 2 quests
    { id: 'sul-001', titleId: 'quest.rammang_rammang.title', location: { name: 'Rammang-Rammang', lat: -4.9833, lng: 119.7667 }, reward: 170, difficulty: 'medium', type: 'visit', region: 'sulawesi', isPopular: true },
    { id: 'sul-002', titleId: 'quest.saluopa.title', location: { name: 'Air Terjun Saluopa', lat: -1.5000, lng: 120.5000 }, reward: 160, difficulty: 'hard', type: 'challenge', region: 'sulawesi', isPopular: false },

    // SULAWESI UTARA - 2 quests
    { id: 'sul-003', titleId: 'quest.bunaken.title', location: { name: 'Taman Laut Bunaken', lat: 1.6167, lng: 124.7667 }, reward: 180, difficulty: 'medium', type: 'challenge', region: 'sulawesi', isPopular: true },
    { id: 'sul-004', titleId: 'quest.pulau_lihaga.title', location: { name: 'Pulau Lihaga', lat: 1.5000, lng: 124.8000 }, reward: 150, difficulty: 'medium', type: 'visit', region: 'sulawesi', isPopular: false },

    // BALI - 2 quests
    { id: 'bal-001', titleId: 'quest.uluwatu.title', location: { name: 'Uluwatu', lat: -8.8290, lng: 115.0849 }, reward: 140, difficulty: 'medium', type: 'visit', region: 'bali', isPopular: true },
    { id: 'bal-002', titleId: 'quest.sekumpul.title', location: { name: 'Air Terjun Sekumpul', lat: -8.2500, lng: 115.1500 }, reward: 170, difficulty: 'hard', type: 'challenge', region: 'bali', isPopular: false },

    // NTB (LOMBOK) - 2 quests
    { id: 'ntb-001', titleId: 'quest.rinjani.title', location: { name: 'Gunung Rinjani', lat: -8.4119, lng: 116.4572 }, reward: 250, difficulty: 'hard', type: 'challenge', region: 'nusa-tenggara', isPopular: true },
    { id: 'ntb-002', titleId: 'quest.pink_beach.title', location: { name: 'Pantai Pink', lat: -8.6833, lng: 119.5167 }, reward: 130, difficulty: 'medium', type: 'visit', region: 'nusa-tenggara', isPopular: false },

    // NTT (FLORES/KOMODO) - 2 quests
    { id: 'ntt-001', titleId: 'quest.komodo.title', location: { name: 'Pulau Komodo', lat: -8.5500, lng: 119.4500 }, reward: 220, difficulty: 'hard', type: 'visit', region: 'nusa-tenggara', isPopular: true },
    { id: 'ntt-002', titleId: 'quest.wae_rebo.title', location: { name: 'Wae Rebo', lat: -8.6500, lng: 120.5000 }, reward: 200, difficulty: 'hard', type: 'visit', region: 'nusa-tenggara', isPopular: false },

    // MALUKU - 2 quests
    { id: 'mal-001', titleId: 'quest.pantai_ora.title', location: { name: 'Pantai Ora', lat: -3.0000, lng: 129.5000 }, reward: 190, difficulty: 'medium', type: 'visit', region: 'maluku', isPopular: true },
    { id: 'mal-002', titleId: 'quest.ngurtavur.title', location: { name: 'Pantai Ngurtavur', lat: -5.5000, lng: 132.7500 }, reward: 180, difficulty: 'medium', type: 'visit', region: 'maluku', isPopular: false },

    // PAPUA BARAT (RAJA AMPAT) - 2 quests
    { id: 'pap-001', titleId: 'quest.wayag.title', location: { name: 'Wayag', lat: -0.2500, lng: 130.1500 }, reward: 300, difficulty: 'hard', type: 'challenge', region: 'papua', isPopular: true },
    { id: 'pap-002', titleId: 'quest.misool.title', location: { name: 'Misool Hidden Lagoons', lat: -1.8833, lng: 130.1167 }, reward: 280, difficulty: 'hard', type: 'challenge', region: 'papua', isPopular: false },
];

// TOTAL: 34 NEW QUESTS (17 Popular + 17 Hidden Gems)
// Combined with existing quests = 75+ total destinations
