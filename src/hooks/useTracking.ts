import { IUser } from '@/constants/interface';
import { useStore } from 'zmp-framework/react';
import api from 'zmp-sdk';
import { APP_CONFIG, TRACKING_CODE } from '../constants';
import HomeService from '../modules/home/service';

const useTracking = () => {
    const { zaloVersion, platform } = api.getSystemInfo();
    const userInfo: IUser = useStore('user');
    const appId: string = useStore('appId');

    const logTrack = (trackingCode: TRACKING_CODE) => {
        const params = {
            miniAppId: `${appId}`,
            miniAppName: APP_CONFIG.title,
            userId: `${userInfo?.id}`,
            userAgent: navigator?.userAgent,
            zaloVersion: zaloVersion,
            os: platform,
            code: trackingCode,
        };
        HomeService.logTrack(params);
    };

    return logTrack;
};
export default useTracking;
