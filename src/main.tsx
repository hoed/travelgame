// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // ← Your neon theme stays in control

// Reown AppKit (Web3Modal v4) - no heavy CSS
import { createAppKit } from '@reown/appkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { polygon } from 'wagmi/chains';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

// Your free project ID from https://cloud.reown.com
const projectId = '1ef3def5d79cc4883140220816426250'; // ← same as before

const metadata = {
  name: 'Smartour',
  description: 'Explore Indonesia, Earn Rewards',
  url: 'https://travelgame.vercel.app',
  icons: ['https://travelgame.vercel.app/logo.png'],
};

createAppKit({
  adapters: [new WagmiAdapter()],
  projectId,
  networks: [polygon],
  metadata,
  features: {
    analytics: true,
  },
});

// Telegram WebApp init
if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
  tg.enableClosingConfirmation();
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={createAppKit.getState().config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);