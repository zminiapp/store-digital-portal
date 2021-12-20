import React from 'react';
import { CLIENT_CONFIG, ROUTE, TRACKING_CODE } from '@/constants';
import './style.less';
import { Box, zmp } from 'zmp-framework/react';
import useTracking from '@/hooks/useTracking';

const Gallery = () => {
    const logTrack = useTracking();
    const handleOpenModal = index => {
        logTrack(TRACKING_CODE.MENU);
        const zmprouter = zmp.views.main.router;
        zmprouter.navigate(ROUTE.MODAL, {
            transition: 'zmp-dive',
            props: {
                currentIndex: index,
            },
        });
    };

    return (
        <div onClick={() => handleOpenModal(0)}>
            <Box className="container menu-container" m={0} p={4}>
                <div className="gallery-wrapper">
                    <div className="header">
                        <h3 className="title">Menu</h3>
                        <span className="btn">Xem tất cả</span>
                    </div>

                    <div className="img-wrapper">
                        <img className="image" loading="lazy" src={CLIENT_CONFIG.menu?.[0]} />
                    </div>
                </div>
            </Box>
        </div>
    );
};

export default Gallery;
