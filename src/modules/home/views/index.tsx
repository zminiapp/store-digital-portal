import React from 'react';
import { CLIENT_CONFIG } from '../../../constants';
import ButtonBlock from './components/buttons';
import GalleryBlock from './components/gallery';
import InfoBlock from './components/info';
import PromotionsBlock from './components/promotion';
import WifiBlock from './components/wifi';
import './style.less';

const HomeView = () => {
    return (
        <div className="home">
            <InfoBlock />

            <ButtonBlock />

            {CLIENT_CONFIG.wifi?.name ? <WifiBlock /> : null}

            {CLIENT_CONFIG.promotion?.length ? <PromotionsBlock /> : null}

            {CLIENT_CONFIG.menu?.length ? <GalleryBlock /> : null}
        </div>
    );
};

export default HomeView;
