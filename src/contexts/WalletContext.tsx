// src/contexts/WalletContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { formatUnits } from 'viem';
import { SMARTOUR_TOKEN_ADDRESS } from '../config/web3Config';

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  maticBalance: string | null;
  tokenBalance: string | null;
  useNonCryptoMode: boolean;
  toggleNonCryptoMode: () => void;
  claimTokens: (amount: number) => Promise<boolean>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within WalletProvider');
  return context;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [useNonCryptoMode, setUseNonCryptoMode] = useState(
    localStorage.getItem('nonCryptoMode') === 'true'
  );

  const { address, isConnected } = useAccount();

  // MATIC balance
 18 decimals
  const { data: maticData } = useBalance({ address });
  const maticBalance = maticData ? formatUnits(maticData.value, 18) : null;

  // SMT token balance — assuming 18 decimals (change if different)
  const { data: tokenData } = useBalance({
    address,
    token: SMARTOUR_TOKEN_ADDRESS as `0x${string}`,
  });
  const tokenBalance = tokenData ? formatUnits(tokenData.value, 18) : null;

  const toggleNonCryptoMode = () => {
    const newMode = !useNonCryptoMode;
    setUseNonCryptoMode(newMode);
    localStorage.setItem('nonCryptoMode', String(newMode));
  };

  const claimTokens = async (amount: number): Promise<boolean> => {
    if (useNonCryptoMode) return true;
    if (!isConnected) {
      alert('Connect wallet first!');
      return false;
    }
    alert(`Claimed ${amount} SMT!`);
    return true;
  };

  return (
    <WalletContext.Provider
      value={{
        address: address ?? null,
        isConnected,
        maticBalance,
        tokenBalance,
        useNonCryptoMode,
        toggleNonCryptoMode,
        claimTokens,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};