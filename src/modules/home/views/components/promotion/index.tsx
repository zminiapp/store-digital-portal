import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay, Lazy } from 'swiper';
import { CLIENT_CONFIG, TRACKING_CODE } from '@/constants';
import './style.less';
import useTracking from '@/hooks/useTracking';

SwiperCore.use([Pagination, Autoplay, Lazy]);

const Promotions = () => {
    const logTrack = useTracking();
    return (
        <div
            onClick={() => {
                logTrack(TRACKING_CODE.BANNER);
            }}
        >
            <Swiper
                className="promotion-wrapper"
                centeredSlides={true}
                spaceBetween={16}
                slidesPerView={1}
                allowTouchMove={false}
                lazy={true}
                autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
            >
                {CLIENT_CONFIG.promotion.map((image, index) => (
                    <SwiperSlide key={index}>
                        <figure className="image">
                            <img data-src={image} className="swiper-lazy" key={index} />
                        </figure>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Promotions;
