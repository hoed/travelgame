// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// RainbowKit + wagmi imports
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create wagmi config (only Polygon)
const config = getDefaultConfig({
  appName: 'Smartour',
  projectId: '1ef3def5d79cc4883140220816426250', // Get free at https://cloud.walletconnect.com
  chains: [polygon],
  ssr: false,
});

// React Query client
const queryClient = new QueryClient();

// Initialize Telegram WebApp (your original code – kept 100%)
if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
  tg.enableClosingConfirmation();
}

// Render app with RainbowKit + Wagmi + Telegram support
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#7c3aed',
            accentColorForeground: 'white',
            borderRadius: 'large',
            fontStack: 'system',
          })}
          initialChain={polygon}
        >
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);