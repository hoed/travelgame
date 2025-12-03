import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
    address: string | null;
    balance: string;
    tokenBalance: string;
    isConnected: boolean;
    isConnecting: boolean;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    claimTokens: (amount: number) => Promise<boolean>;
    sendTokens: (to: string, amount: number) => Promise<boolean>;
    useNonCryptoMode: boolean;
    toggleNonCryptoMode: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within WalletProvider');
    }
    return context;
};

interface WalletProviderProps {
    children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
    const [address, setAddress] = useState<string | null>(null);
    const [balance, setBalance] = useState('0');
    const [tokenBalance, setTokenBalance] = useState('0');
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [useNonCryptoMode, setUseNonCryptoMode] = useState(false);
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

    useEffect(() => {
        // Check if user prefers non-crypto mode
        const nonCryptoMode = localStorage.getItem('nonCryptoMode');
        if (nonCryptoMode === 'true') {
            setUseNonCryptoMode(true);
        }

        // Check if wallet was previously connected
        const savedAddress = localStorage.getItem('walletAddress');
        if (savedAddress && !useNonCryptoMode) {
            connectWallet();
        }
    }, []);

    const connectWallet = async () => {
        if (useNonCryptoMode) {
            console.log('Non-crypto mode enabled, skipping wallet connection');
            return;
        }

        setIsConnecting(true);
        try {
            // Check if running in Telegram WebView
            if (typeof window.ethereum !== 'undefined') {
                const web3Provider = new ethers.BrowserProvider(window.ethereum);
                setProvider(web3Provider);

                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                }) as string[];

                if (accounts.length > 0) {
                    const userAddress = accounts[0];
                    setAddress(userAddress);
                    setIsConnected(true);
                    localStorage.setItem('walletAddress', userAddress);

                    // Get balances
                    await updateBalances(web3Provider, userAddress);
                }
            } else {
                // Fallback: Use WalletConnect or show instructions
                console.log('No Web3 provider found. Please install MetaMask or use WalletConnect.');
                // For Telegram Mini App, we might use TON wallet or other alternatives
                alert('Please connect a Web3 wallet to earn blockchain tokens. You can continue in non-crypto mode to earn in-game credits.');
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
        } finally {
            setIsConnecting(false);
        }
    };

    const disconnectWallet = () => {
        setAddress(null);
        setBalance('0');
        setTokenBalance('0');
        setIsConnected(false);
        localStorage.removeItem('walletAddress');
    };

    const updateBalances = async (web3Provider: ethers.BrowserProvider, userAddress: string) => {
        try {
            // Get native balance
            const nativeBalance = await web3Provider.getBalance(userAddress);
            setBalance(ethers.formatEther(nativeBalance));

            // Get TOUR token balance
            // TODO: Replace with actual token contract address
            const tokenContractAddress = '0x...'; // Smartour Token contract
            const tokenABI = [
                'function balanceOf(address owner) view returns (uint256)',
            ];

            const tokenContract = new ethers.Contract(
                tokenContractAddress,
                tokenABI,
                web3Provider
            );

            const tokenBal = await tokenContract.balanceOf(userAddress);
            setTokenBalance(ethers.formatUnits(tokenBal, 18));
        } catch (error) {
            console.error('Error fetching balances:', error);
        }
    };

    const claimTokens = async (amount: number): Promise<boolean> => {
        if (useNonCryptoMode) {
            // In non-crypto mode, just update local storage
            const currentCredits = parseInt(localStorage.getItem('gameCredits') || '0');
            localStorage.setItem('gameCredits', (currentCredits + amount).toString());
            setTokenBalance((currentCredits + amount).toString());
            return true;
        }

        if (!provider || !address) {
            console.error('Wallet not connected');
            return false;
        }

        try {
            // TODO: Implement actual token claiming logic
            // This would interact with a backend API that verifies the claim
            // and sends tokens to the user's wallet

            const response = await fetch('/api/claim-tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address,
                    amount,
                    telegramId: window.Telegram?.WebApp?.initDataUnsafe?.user?.id,
                }),
            });

            if (response.ok) {
                await updateBalances(provider, address);
                return true;
            }

            return false;
        } catch (error) {
            console.error('Error claiming tokens:', error);
            return false;
        }
    };

    const sendTokens = async (to: string, amount: number): Promise<boolean> => {
        if (useNonCryptoMode) {
            console.log('Cannot send tokens in non-crypto mode');
            return false;
        }

        if (!provider || !address) {
            console.error('Wallet not connected');
            return false;
        }

        try {
            const signer = await provider.getSigner();
            const tokenContractAddress = '0x...'; // Smartour Token contract
            const tokenABI = [
                'function transfer(address to, uint256 amount) returns (bool)',
            ];

            const tokenContract = new ethers.Contract(
                tokenContractAddress,
                tokenABI,
                signer
            );

            const tx = await tokenContract.transfer(to, ethers.parseUnits(amount.toString(), 18));
            await tx.wait();

            await updateBalances(provider, address);
            return true;
        } catch (error) {
            console.error('Error sending tokens:', error);
            return false;
        }
    };

    const toggleNonCryptoMode = () => {
        const newMode = !useNonCryptoMode;
        setUseNonCryptoMode(newMode);
        localStorage.setItem('nonCryptoMode', newMode.toString());

        if (newMode) {
            disconnectWallet();
        }
    };

    const value: WalletContextType = {
        address,
        balance,
        tokenBalance,
        isConnected,
        isConnecting,
        connectWallet,
        disconnectWallet,
        claimTokens,
        sendTokens,
        useNonCryptoMode,
        toggleNonCryptoMode,
    };

    return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};
