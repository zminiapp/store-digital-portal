import React from 'react';
import ModalView from '../modules/modal/views';
import { Page } from 'zmp-framework/react';

const ModalPage = props => {
    return (
        <Page name="Modal">
            <ModalView {...props} />
        </Page>
    );
};

export default ModalPage;
