import Avatar from '@/assets/icon/avatar';
import { APP_CONFIG, CLIENT_CONFIG, TRACKING_CODE } from '@/constants';
import { IUser } from '@/constants/interface';
import useTracking from '@/hooks/useTracking';
import { getGreetingFromTime } from '@/utils';
import React, { useEffect, useRef } from 'react';
import { Box, useStore, zmp } from 'zmp-framework/react';

const InfoBlock = () => {
    const userInfo: IUser = useStore('user');
    const dialog = useRef(null);
    const logTrack = useTracking();

    useEffect(() => {
        dialog.current = zmp.dialog.create({
            title: 'Tính năng đang cập nhật',
            content: `<div class="dialog-text">Tính năng Đăng ký thành viên đang được <b>${
                APP_CONFIG.title
            }</b> cập nhật. Mời <b>${userInfo.name || 'bạn'}</b> quay lại sau.</div>`,
            buttons: [
                {
                    text: 'Đóng',
                },
            ],
        });
    }, [userInfo]);

    const handleModal = () => {
        logTrack(TRACKING_CODE.MEMBER);
        if (dialog.current) {
            dialog.current.open();
        }
    };

    return (
        <>
            <Box
                justifyContent="flex-end"
                p={0}
                m={4}
                flex
                alignItems="center"
                className="userInfo"
            >
                <div className="user-block" onClick={handleModal}>
                    <div style={{ textAlign: 'right', marginRight: '8px' }}>
                        <div className="greeting">{`Chào buổi ${getGreetingFromTime()},`}</div>
                        <div className="btn-sign-up">
                            <strong>Đăng ký thành viên</strong>
                        </div>
                    </div>
                    <Avatar />
                </div>
            </Box>
            <Box
                style={{
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.02), 0px 4px 8px rgba(0, 0, 0, 0.02)',
                }}
                m={4}
                p={0}
            >
                <div className="logo-wrapper" onClick={() => logTrack(TRACKING_CODE.STORE_INFO)}>
                    <figure className="image">
                        <img src={CLIENT_CONFIG.logoURL} alt="logo" />
                    </figure>

                    <p className="name">{APP_CONFIG.title}</p>
                    <p className="address"> {CLIENT_CONFIG.address}</p>
                </div>
            </Box>
        </>
    );
};

export default InfoBlock;
