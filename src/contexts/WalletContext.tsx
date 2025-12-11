import React, { createContext, useContext, useState } from 'react';
// Tambahkan useReadContract
import { useAccount, useBalance, useReadContract } from 'wagmi';
import { SMARTOUR_TOKEN_ADDRESS } from '../config/web3Config';
// import { useLanguage } from './LanguageContext'; // Sudah dihapus
import { formatUnits } from 'viem';

// --- TAMBAHKAN DEFINISI ABI UNTUK FUNGSI BALANCEOF ---
// Kita hanya perlu mendefinisikan fungsi yang akan kita panggil (balanceOf)
const smartourTokenAbi = [
    {
        name: 'balanceOf',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ name: '', type: 'uint256' }],
    },
] as const;
// Asumsi decimals token adalah 18, ini standar ERC20. 
// Jika token Anda memiliki decimals yang berbeda, ganti nilai ini.
const TOKEN_DECIMALS = 18;
// ----------------------------------------------------

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

    // 1. Ambil Balance Native (MATIC/ETH) - Masih menggunakan useBalance
    const { data: maticData } = useBalance({ address });
    const maticBalance = maticData
        ? formatUnits(maticData.value, maticData.decimals)
        : null;

    // 2. Ambil Balance Token (SMARTOUR) - MENGGUNAKAN useReadContract
    const { data: tokenBalanceRaw } = useReadContract({
        // FIX: Menggunakan useReadContract alih-alih useBalance dengan properti 'token'
        abi: smartourTokenAbi,
        address: SMARTOUR_TOKEN_ADDRESS as `0x${string}`,
        functionName: 'balanceOf',
        // Kita panggil fungsi balanceOf dengan argumen address user
        args: [address as `0x${string}`],
        query: {
            // Hanya panggil hook jika address dan koneksi sudah siap
            enabled: !!address && isConnected,
        },
    });

    // Data yang dikembalikan adalah BigInt (uint256), kita format manual
    const tokenBalanceBigInt = tokenBalanceRaw as bigint | undefined;

    const tokenBalance = tokenBalanceBigInt
        ? formatUnits(tokenBalanceBigInt, TOKEN_DECIMALS)
        : null; // Gunakan TOKEN_DECIMALS yang diasumsikan 18

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