import api from 'zmp-sdk';
import store from '../store';

export interface IAppInfo {
    name: string;
    description: string;
    version: string;
    appUrl: string;
    qrCodeUrl: string;
}

const useGetAppInfo = () => {
    const getAppInfo = () => {
        api.getAppInfo({
            success: data => {
                store.dispatch('setAppInfo', data);
                console.log('get appInfo|success', data);
            },
            fail: error => {
                console.error('get appInfo|error', error);
            },
        });
    };

    return { getAppInfo };
};
export default useGetAppInfo;
