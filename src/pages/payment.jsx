import React from 'react';
import PaymentView from '../modules/payment/views';
import { Page } from 'zmp-framework/react';

const PaymentPage = props => {
    return (
        <Page name="Payment">
            <PaymentView {...props} />
        </Page>
    );
};

export default PaymentPage;
