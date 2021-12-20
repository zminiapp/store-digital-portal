import React from 'react';
import { CLIENT_CONFIG, TRACKING_CODE } from '@/constants';
import { Box } from 'zmp-framework/react';
import { copyToClipboard } from '@/utils';
import { zmp } from 'zmp-framework/react';
import useTracking from '@/hooks/useTracking';
import './style.less';
import { icWifi } from '@/assets/icon';

const WifiBlock = () => {
    const logTrack = useTracking();

    const handleCopyWifi = () => {
        logTrack(TRACKING_CODE.WIFI);
        copyToClipboard(CLIENT_CONFIG.wifi?.password);
        const toast = zmp.toast.create({
            text: 'Mật khẩu đã được sao chép',
            position: 'bottom',
            closeTimeout: 2000,
        });
        toast.open();
    };

    return (
        <div onClick={handleCopyWifi}>
            <Box className="container wifi-wrapper" mt={4} mb={4} ml={0} mr={0} p={4}>
                <h3>Truy cập wifi</h3>
                <div className="wifi-item">
                    <div className="wifi-item-content">
                        <figure className="image">
                            <img src={icWifi} alt="icon wifi" />
                        </figure>
                        <div>
                            <p className="name">{CLIENT_CONFIG.wifi?.name}</p>
                            <p className="password">{CLIENT_CONFIG.wifi?.password}</p>
                        </div>
                    </div>
                    <div className="btn">Sao chép</div>
                </div>
            </Box>
        </div>
    );
};

export default WifiBlock;
