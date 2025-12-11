// Type declarations for Telegram WebApp
interface TelegramWebApp {
    initData: string;
    initDataUnsafe: {
        user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            photo_url?: string;
        };
        query_id?: string;
        auth_date?: number;
        hash?: string;
    };
    ready: () => void;
    expand: () => void;
    close: () => void;
    MainButton: {
        text: string;
        color: string;
        textColor: string;
        isVisible: boolean;
        isActive: boolean;
        setText: (text: string) => void;
        onClick: (callback: () => void) => void;
        show: () => void;
        hide: () => void;
    };
    BackButton: {
        isVisible: boolean;
        onClick: (callback: () => void) => void;
        show: () => void;
        hide: () => void;
    };
}

interface Window {
    Telegram?: {
        WebApp: TelegramWebApp;
    };
    ethereum?: {
        request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
        on: (event: string, handler: (...args: unknown[]) => void) => void;
        removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
        isMetaMask?: boolean;
    };
}

declare global {
    interface Window {
        Telegram?: {
            WebApp: TelegramWebApp;
        };
        ethereum?: {
            request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
            on: (event: string, handler: (...args: unknown[]) => void) => void;
            removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
            isMetaMask?: boolean;
        };
    }

    // *** KODE PERBAIKAN UNTUK w3m-button DITEMPATKAN DI SINI ***
    namespace JSX {
        interface IntrinsicElements {
            'w3m-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                size?: 'sm' | 'md' | 'lg';
                label?: string;
                balance?: 'show' | 'hide';
            };
        }
    }
    // ************************************************************
}

export { };