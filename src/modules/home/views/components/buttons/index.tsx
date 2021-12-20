import { icHealthDeclaration, icOaChat, icPayment, icQrWallet } from '@/assets/icon';
import {
    APP_CONFIG,
    CLIENT_CONFIG,
    HEALTH_DECLARE_RESET_TIME,
    QR_WALLET_OA_ID,
    ROUTE,
    TRACKING_CODE,
} from '@/constants';
import { IUser } from '@/constants/interface';
import { IAppInfo } from '@/hooks/useGetAppInfo';
import useTracking from '@/hooks/useTracking';
import { getResetTimeInDate } from '@/utils';
import { getStorage, openChat, openWebView, setStorage } from '@/utils/zalo';
import dayjs from 'dayjs';
import React, { useEffect, useRef } from 'react';
import { Box, Col, Row, useStore, zmp } from 'zmp-framework/react';

const BUTTON_KEY_LIST = ['medicalLink', 'oaId', 'payment'];

const ButtonWrapper = () => {
    const zmprouter = zmp.views.main.router;
    const logTrack = useTracking();

    const dialog = useRef(null);

    const userInfo: IUser = useStore('user');
    const appInfo: IAppInfo = useStore('appInfo');
    const appId: string = useStore('appId');

    const keyStorage = `${appId}-${HEALTH_DECLARE_RESET_TIME}`;

    const handleOpenQRWallet = () => {
        logTrack(TRACKING_CODE.QR_WALLET);
        openChat('oa', QR_WALLET_OA_ID);
    };

    const openHealthDeclaration = () => {
        openWebView(CLIENT_CONFIG.medicalLink);
    };

    const handleOpenHealthDeclarationInModal = () => {
        logTrack(TRACKING_CODE.HEALTH_DECLARATION_MODAL);
        openHealthDeclaration();
    };

    const handleOpenHealthDeclaration = () => {
        logTrack(TRACKING_CODE.HEALTH_DECLARATION);
        openHealthDeclaration();
    };

    const handleOpenPayment = () => {
        logTrack(TRACKING_CODE.PAYMENT);
        zmprouter.navigate(ROUTE.PAYMENT);
    };

    const handleChatWithOA = () => {
        logTrack(TRACKING_CODE.CHAT_WITH_STORE);
        openChat('oa', CLIENT_CONFIG.oaId);
    };

    const setHealthDeclareResetTime = () => {
        const currentTime = dayjs();
        let resetTime = getResetTimeInDate(currentTime);
        if (currentTime.isAfter(resetTime)) {
            resetTime = resetTime.add(1, 'days');
        }
        setStorage(keyStorage, resetTime);

        dialog.current = zmp.dialog.create({
            title: 'Cám ơn bạn đã ghé cửa hàng',
            content: `<div class="dialog-text">Mời bạn thực hiện Khai báo Y tế bắt buộc trước khi sử dụng Chương trình nhỏ <b>${APP_CONFIG.title}.</b></div>`,
            buttons: [
                {
                    text: 'Đồng ý',
                    onClick: handleOpenHealthDeclarationInModal,
                },
            ],
        });
        dialog.current.open();
    };

    useEffect(() => {
        if (userInfo.id && appInfo.appUrl && CLIENT_CONFIG.medicalLink) {
            getStorage(
                keyStorage,
                data => {
                    const healthDeclareResetTime = data[keyStorage];
                    if (dayjs().isBefore(healthDeclareResetTime)) return;
                    else {
                        setHealthDeclareResetTime();
                    }
                },
                () => {
                    setHealthDeclareResetTime();
                },
            );
        }
    }, [userInfo, appInfo]);

    const numberOfBlocks = () => {
        let numberOfBlocks = 1;
        for (let value of BUTTON_KEY_LIST) {
            if (CLIENT_CONFIG?.[value]) {
                numberOfBlocks++;
            }
        }
        return numberOfBlocks;
    };

    const renderButtonBlocks = () => {
        const blocks = [
            <Col key="QR" onClick={handleOpenQRWallet} className="button-box">
                <figure className="image">
                    <img src={icQrWallet} alt="qr-icon" />
                </figure>
                <div>
                    <p className="title">Ví QR</p>
                </div>
            </Col>,
        ];
        const mapButtonBlocks = {
            oaId: {
                handler: handleChatWithOA,
                icon: icOaChat,
                title: 'Chat với cửa hàng',
            },
            medicalLink: {
                handler: handleOpenHealthDeclaration,
                icon: icHealthDeclaration,
                title: 'Khai báo Y tế',
            },
            payment: { handler: handleOpenPayment, icon: icPayment, title: 'Thanh toán' },
        };
        for (let value of BUTTON_KEY_LIST) {
            if (CLIENT_CONFIG?.[value]) {
                const element = (
                    <Col
                        onClick={mapButtonBlocks?.[value]?.handler}
                        key={value}
                        className="button-box"
                    >
                        <figure className="image">
                            <img src={mapButtonBlocks?.[value]?.icon} alt={`${value}-qr-icon`} />
                        </figure>
                        <div>
                            <p className="title">{mapButtonBlocks?.[value]?.title}</p>
                        </div>
                    </Col>
                );
                if (value === 'medicalLink') {
                    blocks.unshift(element);
                } else {
                    blocks.push(element);
                }
            }
        }
        return blocks;
    };

    return (
        <Box className="container" m={4} p={0} style={{ borderRadius: '8px' }}>
            <div className="button-wrapper">
                <Row className={`${numberOfBlocks() === 3 ? 'block-3-buttons' : ''}`} noGap>
                    {[
                        renderButtonBlocks()[0],
                        renderButtonBlocks()[1],
                        numberOfBlocks() === 3 && renderButtonBlocks()[2],
                    ]}
                </Row>
                {numberOfBlocks() === 4 && (
                    <Row noGap>{[renderButtonBlocks()[2], renderButtonBlocks()[3]]}</Row>
                )}
            </div>
        </Box>
    );
};

export default ButtonWrapper;
