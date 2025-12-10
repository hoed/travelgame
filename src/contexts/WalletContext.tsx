// src/contexts/WalletContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
  address: string | null;
  tokenBalance: string;
  isConnected: boolean;
  useNonCryptoMode: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  toggleNonCryptoMode: () => void;
  claimTokens: (amount: number) => Promise<boolean>;   // ← THIS WAS MISSING
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within WalletProvider');
  return context;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState('0');
  const [useNonCryptoMode, setUseNonCryptoMode] = useState(
    localStorage.getItem('nonCryptoMode') === 'true'
  );

  const isConnected = !!address;

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setAddress(accounts[0]);
      } catch (err) {
        console.error('Wallet connect failed', err);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setTokenBalance('0');
  };

  const toggleNonCryptoMode = () => {
    const newMode = !useNonCryptoMode;
    setUseNonCryptoMode(newMode);
    localStorage.setItem('nonCryptoMode', String(newMode));
    if (newMode) disconnectWallet();
  };

  // ← THIS IS THE FUNCTION Rewards.tsx WAS LOOKING FOR
  const claimTokens = async (amount: number): Promise<boolean> => {
    if (useNonCryptoMode) {
      // In non-crypto mode: just add to local balance
      setTokenBalance(prev => String(Number(prev) + amount));
      return true;
    }

    if (!address) {
      alert('Connect wallet first!');
      return false;
    }

    // TODO: Replace with real contract call when ready
    alert(`Claimed ${amount} SMT! (Real tx coming soon)`);
    setTokenBalance(prev => String(Number(prev) + amount));
    return true;
  };

  useEffect(() => {
    if (address && !useNonCryptoMode) {
      setTokenBalance('0'); // placeholder — replace with real fetch later
    }
  }, [address, useNonCryptoMode]);

  return (
    <WalletContext.Provider
      value={{
        address,
        tokenBalance,
        isConnected,
        useNonCryptoMode,
        connectWallet,
        disconnectWallet,
        toggleNonCryptoMode,
        claimTokens,                 // ← NOW INCLUDED
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};