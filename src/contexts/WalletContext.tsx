import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { ethers } from 'ethers';

const TOKEN_CONTRACT_ADDRESS = '0x6242c29bb832fd3ab692940fc23540cfa87ca971';
const POLYGON_CHAIN_ID = '0x89'; // 137
const POLYGON_NETWORK_CONFIG = {
    chainId: POLYGON_CHAIN_ID,
    chainName: 'Polygon Mainnet',
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com/'],
    nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
    },
};

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
            return;
        }

        // Check if wallet was previously connected
        const savedAddress = localStorage.getItem('walletAddress');
        if (savedAddress && typeof window.ethereum !== 'undefined' && window.ethereum) {
            // Auto-reconnect on page load
            const reconnect = async () => {
                try {
                    if (!window.ethereum) return;
                    const web3Provider = new ethers.BrowserProvider(window.ethereum);
                    const accounts = await web3Provider.listAccounts();
                    if (accounts.length > 0) {
                        setProvider(web3Provider);
                        setAddress(savedAddress);
                        setIsConnected(true);
                        await updateBalances(web3Provider, savedAddress);
                    } else {
                        // Clear saved address if no accounts found
                        localStorage.removeItem('walletAddress');
                    }
                } catch (error) {
                    console.error('Error reconnecting wallet:', error);
                    localStorage.removeItem('walletAddress');
                }
            };
            reconnect();
        }
    }, []); // Empty dependency array - only run once on mount

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

                // Switch to Polygon Network
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: POLYGON_CHAIN_ID }],
                    });
                } catch (switchError: any) {
                    // This error code indicates that the chain has not been added to MetaMask.
                    if (switchError.code === 4902) {
                        try {
                            await window.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [POLYGON_NETWORK_CONFIG],
                            });
                        } catch (addError) {
                            console.error('Failed to add Polygon network', addError);
                        }
                    } else {
                        console.error('Failed to switch to Polygon network', switchError);
                    }
                }

                if (accounts.length > 0) {
                    const userAddress = accounts[0];
                    setAddress(userAddress);
                    setIsConnected(true);
                    localStorage.setItem('walletAddress', userAddress);

                    // Get balances
                    await updateBalances(web3Provider, userAddress);
                }
            } else {
                // No Web3 provider found - user can enable non-crypto mode in settings
                console.log('No Web3 provider found. You can enable non-crypto mode in Profile settings.');
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

            // Get SMT token balance
            const tokenContractAddress = TOKEN_CONTRACT_ADDRESS;
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
            const tokenContractAddress = TOKEN_CONTRACT_ADDRESS;
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
