import { ROUTE } from '@/constants';
import { zmp } from 'zmp-framework/types/react';
import api from 'zmp-sdk';

type OPEN_CHAT_TYPE = 'user' | 'oa';

export const setStorage = (key, value, cbSuccess = undefined, cbFail = undefined) => {
    api.setStorage({
        data: {
            [key]: value,
        },
        success: data => {
            cbSuccess && cbSuccess(data);
        },
        fail: error => {
            cbFail && cbFail();
            console.error('set storage|error', error);
        },
    });
};

export const getStorage = (key, cbSuccess = undefined, cbFail = undefined) => {
    api.getStorage({
        keys: [key],
        success: data => {
            cbSuccess && cbSuccess(data);
        },
        fail: error => {
            cbFail && cbFail();
            console.error('get storage|error', error);
        },
    });
};

export const openChat = (type: OPEN_CHAT_TYPE, id: string) => {
    api.openChat({
        type,
        id,
        success: () => {
            console.log('success open qr wallet chat');
        },
        fail: err => {
            console.log('err', err);
        },
    });
};

export const openWebView = (link: string) => {
    api.openWebview({
        url: encodeURI(link),
        success: res => {
            console.log('open webview success', res);
        },
        fail: error => {
            console.log('open webview fail');
        },
    });
};
