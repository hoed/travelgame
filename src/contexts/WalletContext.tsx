// src/contexts/WalletContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { SMARTOUR_TOKEN_ADDRESS } from '../config/web3Config';
import { Wallet } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import './WalletConnect.css';

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

  const { data: maticData } = useBalance({ address });
  const maticBalance = maticData?.formatted ?? null;

  const { data: tokenData } = useBalance({
    address,
    token: SMARTOUR_TOKEN_ADDRESS,
  });
  const tokenBalance = tokenData?.formatted ?? null;

  const toggleNonCryptoMode = () => {
    const newMode = !useNonCryptoMode;
    setUseNonCryptoMode(newMode);
    localStorage.setItem('nonCryptoMode', String(newMode));
  };

  const claimTokens = async (amount: number): Promise<boolean> => {
    if (useNonCryptoMode) {
      console.log(`Claimed ${amount} SMT (non-crypto mode)`);
      return true;
    }
    if (!isConnected) {
      alert('Please connect wallet first');
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

// Beautiful RainbowKit wallet button
export const WalletConnectButton: React.FC = () => {
  const { t } = useLanguage();
  const { useNonCryptoMode, toggleNonCryptoMode, tokenBalance } = useWallet();

  if (useNonCryptoMode) {
    return (
      <button onClick={toggleNonCryptoMode} className="non-crypto-btn">
        Non-Crypto Mode Active
      </button>
    );
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const connected = mounted && account && chain;

        return (
          <div className="wallet-connect-wrapper">
            {!connected ? (
              <button onClick={openConnectModal} className="connect-btn">
                <Wallet size={18} />
                {t('wallet.connect')}
              </button>
            ) : chain.unsupported ? (
              <button onClick={openChainModal} className="wrong-network">
                Wrong Network
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {chain.iconUrl && (
                  <img src={chain.iconUrl} alt={chain.name} width={24} height={24} style={{ borderRadius: 12 }} />
                )}
                <button onClick={openAccountModal} className="account-btn">
                  {account.displayName}
                  {account.displayBalance && ` • ${account.displayBalance}`}
                </button>
                {tokenBalance && parseFloat(tokenBalance) > 0 && (
                  <span className="smt-badge">
                    {parseFloat(tokenBalance).toFixed(2)} SMT
                  </span>
                )}
              </div>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

// Export both
export { WalletProvider, WalletConnectButton };