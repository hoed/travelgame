// src/pages/Map.tsx  ←  Replace ONLY this file
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useGame } from '../contexts/GameContext';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icons
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
      alert('Your device does not support GPS');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        // Only accept real GPS with good accuracy (< 50m)
        if (accuracy > 50) return; // ignore bad signals

        updateUserLocation(latitude, longitude);
        localStorage.setItem('realGPS', JSON.stringify([latitude, longitude]));
        map.setView([latitude, longitude], 16, { animate: true });
      },
      (err) => {
        console.warn('Real GPS error:', err.message);
        // Do NOT fall back — stay silent until real GPS works
      },
      {
        enableHighAccuracy: true,   // Forces real GPS chip only
        timeout: 20000,
        maximumAge: 0,              // Never use cached or mock position
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [map, updateUserLocation]);

  return null;
}

const Map: React.FC = () => {
  const { quests } = useGame();
  const [userPos, setUserPos] = React.useState<[number, number] | null>(null);

  // Only show marker if we have REAL GPS from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem('realGPS');
    if (saved) {
      const pos = JSON.parse(saved);
      setUserPos(pos);
    }
  }, []);

  return (
    <MapContainer
      center={[-2.633, 118.0]}   // Indonesia center — just for loading
      zoom={5}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap'
      />

      <RealGPSOnly />

      {/* Real user marker — appears ONLY with real GPS */}
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

      {/* All quest markers */}
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

      {/* Message when no real GPS yet */}
      {!userPos && (
        <div style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(0,0,0,0.8)',
    color: 'white',
    padding: '20px 30px',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 16,        // ← ONLY THIS ONE
    zIndex: 1000
  }}>
          Waiting for real GPS signal...
          <br />
          <small>Turn on Location & allow in Telegram</small>
        </div>
      )}
    </MapContainer>
  );
};

export default Map;