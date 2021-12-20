import config from '../config';
import { IAppConfig, IClientConfig } from './interface';

declare global {
    interface Window {
        APP_CONFIG?: any;
    }
}

export const DOMAIN_API_URL = config.BASE_API_URL || 'https://dev.zalo.cloud/miniapp';

export const CLIENT_CONFIG = window.APP_CONFIG?.clientConfig as IClientConfig;
export const APP_CONFIG = window.APP_CONFIG?.app as IAppConfig;

export const QR_WALLET_OA_ID = '1945712382637115069';

export const HEALTH_DECLARE_RESET_TIME = 'HEALTH_DECLARE_RESET_TIME';

export const ROUTE = {
    HOME: '/',
    WIFI: '/wifi',
    PAYMENT: '/payment',
    MODAL: '/modal',
};

export enum TRACKING_CODE {
    MEMBER = 101,
    STORE_INFO = 102,
    HEALTH_DECLARATION = 103,
    QR_WALLET = 104,
    CHAT_WITH_STORE = 105,
    PAYMENT = 106,
    WIFI = 107,
    BANNER = 108,
    MENU = 109,
    HEALTH_DECLARATION_MODAL = 110,
}
