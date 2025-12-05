import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { useLanguage } from '../contexts/LanguageContext';
import 'leaflet/dist/leaflet.css';
import './Map.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function LocationUpdater() {
    const map = useMap();
    const { updateUserLocation } = useGame();
    const [userPosition, setUserPosition] = useState<[number, number] | null>(null);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setUserPosition([lat, lng]);
                    updateUserLocation(lat, lng);
                    map.setView([lat, lng], 13);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    // Default to Sidoarjo, East Java
                    const defaultPos: [number, number] = [-7.4479, 112.7186];
                    setUserPosition(defaultPos);
                    map.setView(defaultPos, 13);
                }
            );
        }
    }, [map, updateUserLocation]);

    return userPosition ? (
        <Marker position={userPosition}>
            <Popup>You are here</Popup>
        </Marker>
    ) : null;
}

const Map = () => {
    const { quests } = useGame();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [selectedQuest, setSelectedQuest] = useState<string | null>(null);

    const questMarkers = quests.filter((q) => !q.completed);

    return (
        <div className="map-container">
            <div className="map-header">
                <h1>{t('nav.map')}</h1>
            </div>

            <MapContainer
                center={[-7.4479, 112.7186]}
                zoom={10}
                className="leaflet-map"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationUpdater />

                {questMarkers.map((quest) => (
                    <Marker
                        key={quest.id}
                        position={[quest.location.lat, quest.location.lng]}
                        eventHandlers={{
                            click: () => setSelectedQuest(quest.id),
                        }}
                    >
                        <Popup>
                            <div className="map-popup">
                                <h3>{t(quest.titleId)}</h3>
                                <p>{t(quest.descriptionId)}</p>
                                <div className="popup-meta">
                                    <span className="reward">+{quest.reward} SMT</span>
                                    <span className={`difficulty ${quest.difficulty}`}>
                                        {t(`quest.difficulty.${quest.difficulty}`)}
                                    </span>
                                </div>
                                <button
                                    className="popup-btn"
                                    onClick={() => navigate(`/quests/${quest.id}`)}
                                >
                                    {t('quest.start')}
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {selectedQuest && (
                <div className="map-quest-preview">
                    {(() => {
                        const quest = quests.find((q) => q.id === selectedQuest);
                        if (!quest) return null;
                        return (
                            <div className="preview-card">
                                <button
                                    className="close-preview"
                                    onClick={() => setSelectedQuest(null)}
                                >
                                    ×
                                </button>
                                <h3>{t(quest.titleId)}</h3>
                                <p>{t(quest.descriptionId)}</p>
                                <div className="preview-meta">
                                    <span>📍 {quest.location.name}</span>
                                    {quest.distance && (
                                        <span>{quest.distance.toFixed(1)} km away</span>
                                    )}
                                </div>
                                <button
                                    className="btn-primary"
                                    onClick={() => navigate(`/quests/${quest.id}`)}
                                >
                                    {t('quest.start')}
                                </button>
                            </div>
                        );
                    })()}
                </div>
            )}
        </div>
    );
};

export default Map;
