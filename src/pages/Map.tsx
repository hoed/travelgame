// src/pages/Map.tsx  ←  REPLACE ENTIRE FILE WITH THIS
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useGame } from '../contexts/GameContext';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function RealGPSOnly() {
  const map = useMap();
  const { updateUserLocation } = useGame();

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        console.log(`GPS received: ${latitude}, ${longitude} (accuracy: ${accuracy}m)`);

        // REMOVED THE TOO-STRICT 50m CHECK
        // Real phones often start with 80–200m accuracy → now we accept it
        updateUserLocation(latitude, longitude);
        localStorage.setItem('realGPS', JSON.stringify([latitude, longitude]));
        map.setView([latitude, longitude], 16, { animate: true });
      },
      (err) => {
        console.warn('GPS error:', err.message);
      },
      {
        enableHighAccuracy: true,   // Still forces real GPS chip
        timeout: 20000,
        maximumAge: 0,              // No cache, no mock
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [map, updateUserLocation]);

  return null;
}

const Map: React.FC = () => {
  const { quests } = useGame();
  const [userPos, setUserPos] = useState<[number, number] | null>(null);

  // Load saved real GPS on start
  useEffect(() => {
    const saved = localStorage.getItem('realGPS');
    if (saved) {
      const pos = JSON.parse(saved);
      setUserPos(pos);
    }
  }, []);

  return (
    <MapContainer
      center={[-2.633, 118.0]}
      zoom={5}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap'
      />

      <RealGPSOnly />

      {/* Blue dot — appears as soon as we get ANY real GPS */}
      {userPos && (
        <Marker
          position={userPos}
          icon={new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        >
          <Popup>You are here (Real GPS)</Popup>
        </Marker>
      )}

      {/* Quest markers */}
      {quests.map((quest) => (
        <Marker
          key={quest.id}
          position={[quest.location.lat, quest.location.lng]}
        >
          <Popup>
            <strong>{quest.title}</strong>
            <br />+{quest.reward} SMT
          </Popup>
        </Marker>
      ))}

      {/* Waiting message — disappears automatically when GPS arrives */}
      {!userPos && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.85)',
          color: 'white',
          padding: '24px 32px',
          borderRadius: 16,
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 'bold',
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}>
          Waiting for real GPS signal...
          <br />
          <small style={{ fontWeight: 'normal', opacity: 0.9 }}>
            Turn on Location ON & allow in Telegram
          </small>
        </div>
      )}
    </MapContainer>
  );
};

export default Map;