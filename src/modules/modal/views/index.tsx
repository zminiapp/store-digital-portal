import React, { useEffect, useState, memo, useRef } from 'react';
import { CLIENT_CONFIG } from '@/constants';
import { useSwipeVector } from 'use-swipe-hook';
import './style.less';

const GalleryModal = props => {
    const { currentIndex = 0 } = props;
    const [index, setIndex] = useState(currentIndex);

    const swipeContainerRef = useRef<HTMLDivElement>(null);
    const isMounted = useRef<boolean>(false);

    const { direction } = useSwipeVector({
        ref: swipeContainerRef,
        thresholdPX: 5,
        unit: 'deg',
        useRelativeUnits: true,
    });

    const handleSwipe = (isNext: boolean) => {
        if (isNext) {
            const newIndex = index === CLIENT_CONFIG.menu.length - 1 ? 0 : index + 1;
            setIndex(newIndex);
        } else {
            const newIndex = index === 0 ? CLIENT_CONFIG.menu.length - 1 : index - 1;
            setIndex(newIndex);
        }
    };
    useEffect(() => {
        if (isMounted.current) {
            if (direction > 135 && direction < 225) {
                handleSwipe(true);
            }
            if (direction < 45 || direction > 315) {
                handleSwipe(false);
            }
        } else {
            isMounted.current = true;
        }
    }, [direction]);

    return (
        <div ref={swipeContainerRef} className="gallery-modal">
            <div onClick={() => handleSwipe(false)} className="area area--left"></div>
            <div onClick={() => handleSwipe(true)} className="area area--right"></div>
            <figure className="image">
                <img src={CLIENT_CONFIG.menu[index]} alt="current-img" />
            </figure>
            <div className="footer is-active">
                {CLIENT_CONFIG.menu.map((image, idx) => (
                    <div key={idx} onClick={() => setIndex(idx)}>
                        <figure className={`image ${idx === index ? 'is-active' : ''}`}>
                            <img src={image} />
                        </figure>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(GalleryModal);
