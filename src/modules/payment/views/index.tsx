import React from 'react';
import { Box, List, ListItem } from 'zmp-framework/react';
import api from 'zmp-sdk';
import { CLIENT_CONFIG } from '@/constants';
import './style.less';
import { icRightArrow } from '@/assets/payment';
import { openWebView } from '@/utils/zalo';

const PaymentView = () => {
    const handleOpenApp = actionLink => {
        openWebView(actionLink);
    };

    return (
        <Box className="payment-wrapper" p={4} m={0}>
            <p className="info">
                Vui lòng chọn hình thức thanh toán bên dưới để chuyển sang Ứng dụng tương ứng.
            </p>

            <List style={{ marginTop: '0px' }}>
                {CLIENT_CONFIG.payment.map(({ icon, title, description, actionLink }) => (
                    <ListItem
                        key={title}
                        title={title}
                        description={description}
                        onClick={() => handleOpenApp(actionLink)}
                    >
                        <figure className="image" slot="media">
                            <img src={icon} alt="" />
                        </figure>
                        <img src={icRightArrow} alt="" slot="inner-end" />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
export default PaymentView;
