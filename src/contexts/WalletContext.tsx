import React, { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
  address: string | null;
  balance: string;
  connectWallet: () => Promise<void>;
  claimTokens: (amount: number) => Promise<boolean>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within WalletProvider');
  return context;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState('0');

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const addr = accounts[0];
      setAddress(addr);
      localStorage.setItem('wallet_enc', btoa(addr)); // obfuscated
    }
  };

  const claimTokens = async (amount: number): Promise<boolean> => {
    const last = localStorage.getItem('last_claim');
    if (last && Date.now() - parseInt(last) < 60000) {
      alert('Wait 1 minute between claims!');
      return false;
    }

    // TODO: Call real backend or contract
    localStorage.setItem('last_claim', Date.now().toString());
    alert(`Claimed ${amount} SMT!`);
    return true;
  };

  return (
    <WalletContext.Provider value={{ address, balance, connectWallet, claimTokens }}>
      {children}
    </WalletContext.Provider>
  );
};