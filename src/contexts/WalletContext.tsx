import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { SMARTOUR_TOKEN_ADDRESS } from '../../config/web3Config'; // Adjust path if needed
import { Wallet } from 'lucide-react';
import { useLanguage } from '../LanguageContext'; // Adjust path if needed
import './WalletConnect.css'; // Your CSS file

// Interface for context values (enhanced with balances)
interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  maticBalance: string | null;
  tokenBalance: string | null;
  useNonCryptoMode: boolean;
  toggleNonCryptoMode: () => void;
  // Expose wagmi hooks for use in components
  account: ReturnType<typeof useAccount>;
  connectWallet: () => void; // Via RainbowKit modal
  disconnectWallet: () => void;
}

// Create context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within WalletProvider');
  return context;
};

// WalletProvider component (wrap your app in main.tsx)
export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [useNonCryptoMode, setUseNonCryptoMode] = useState(
    localStorage.getItem('nonCryptoMode') === 'true'
  );

  const { address, isConnected, connector } = useAccount();

  // Fetch MATIC balance
  const { data: maticBalanceData } = useBalance({ address });
  const maticBalance = maticBalanceData?.formatted || null;

  // Fetch SMT token balance
  const { data: tokenBalanceData } = useBalance({
    address,
    token: SMARTOUR_TOKEN_ADDRESS,
  });
  const tokenBalance = tokenBalanceData?.formatted || null;

  const toggleNonCryptoMode = () => {
    const newMode = !useNonCryptoMode;
    setUseNonCryptoMode(newMode);
    localStorage.setItem('nonCryptoMode', String(newMode));
    if (newMode) {
      // Disconnect wallet in non-crypto mode
      connector?.disconnect?.();
    }
  };

  // Expose connect/disconnect (via wagmi)
  const connectWallet = () => {
    if (useNonCryptoMode) return; // Skip in non-crypto mode
    // Trigger RainbowKit modal (handled in WalletConnect component)
  };

  const disconnectWallet = () => {
    connector?.disconnect?.();
  };

  const value: WalletContextType = {
    address,
    isConnected,
    maticBalance,
    tokenBalance,
    useNonCryptoMode,
    toggleNonCryptoMode,
    account: { address, isConnected, connector }, // Proxy wagmi account
    connectWallet,
    disconnectWallet,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

// Standalone WalletConnect component (use this in Profile/Rewards pages)
const WalletConnect: React.FC = () => {
  const { address, isConnected, maticBalance, tokenBalance, useNonCryptoMode, toggleNonCryptoMode } = useWallet();
  const { t } = useLanguage();
  const { openConnectModal, openAccountModal, openChainModal, chain } = useAccount(); // Reuse wagmi hooks

  // Note: For full RainbowKit integration, wrap this in <ConnectButton.Custom> as per the original
  // But since context handles state, we build a custom UI here

  if (useNonCryptoMode) {
    return (
      <div className="wallet-connect-wrapper">
        <button onClick={toggleNonCryptoMode} className="wallet-toggle-button">
          {t('switchToCryptoMode')}
        </button>
        <span>{t('nonCryptoModeActive')}</span>
      </div>
    );
  }

  return (
    <div className="wallet-connect-wrapper">
      {(() => {
        if (!isConnected) {
          return (
            <button onClick={openConnectModal} type="button" className="wallet-connect-button">
              <Wallet size={18} />
              {t('connectWallet')}
            </button>
          );
        }
        if (chain?.unsupported) {
          return (
            <button onClick={openChainModal} type="button" className="wallet-wrong-network">
              Wrong network
            </button>
          );
        }
        return (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              onClick={openChainModal}
              style={{ display: 'flex', alignItems: 'center' }}
              type="button"
              className="wallet-chain-button"
            >
              {chain?.hasIcon && (
                <div
                  style={{
                    background: chain.iconBackground,
                    width: 20,
                    height: 20,
                    borderRadius: 999,
                    overflow: 'hidden',
                    marginRight: 4,
                  }}
                >
                  {chain.iconUrl && (
                    <img
                      alt={chain.name ?? 'Chain icon'}
                      src={chain.iconUrl}
                      style={{ width: 20, height: 20 }}
                    />
                  )}
                </div>
              )}
            </button>
            <button onClick={openAccountModal} type="button" className="wallet-account-button">
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Account'}
              {maticBalance ? ` (${maticBalance} MATIC)` : ''}
            </button>
            {tokenBalance && parseFloat(tokenBalance) > 0 && (
              <div className="token-balance-badge">
                <Wallet size={14} />
                <span className="token-amount">
                  {parseFloat(tokenBalance).toFixed(2)} SMT
                </span>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
};

export default WalletConnect;