import { createStore } from 'zmp-core/lite';
import api from 'zmp-sdk';

const store = createStore({
    state: {
        user: {
            avatar: '',
            birthday: '',
            gender: '',
            id: '',
            name: '',
        },
        appInfo: {
            name: '',
            description: '',
            version: '',
            appUrl: '',
            qrCodeUrl: '',
        },
    },
    getters: {
        user({ state }) {
            return state.user;
        },
        appInfo({ state }) {
            return state.appInfo;
        },
        appId({ state }) {
            const appUrlSplits = state.appInfo?.appUrl.split('/');
            return appUrlSplits[appUrlSplits.length - 2];
        },
    },
    actions: {
        setUser({ state }, user) {
            state.user = user;
        },
        setAppInfo({ state }, appInfo) {
            state.appInfo = appInfo;
        },
    },
});

export default store;
