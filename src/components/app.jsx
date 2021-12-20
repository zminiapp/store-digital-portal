import React, { useEffect } from 'react';
import { zmpready, App, View } from 'zmp-framework/react';
import useAuth from '../hooks/useAuth';
import useGetAppInfo from '../hooks/useGetAppInfo';
import store from '../store';

const MyApp = () => {
    const { login } = useAuth();
    const { getAppInfo } = useGetAppInfo();
    const zmpparams = {
        name: 'QMA Research', // App name
        theme: 'auto', // Automatic theme detection
        store: store, // App store
    };
    useEffect(() => {
        zmpready(() => {
            login();
            getAppInfo();
        });
    }, []);

    return (
        <App {...zmpparams}>
            <View iosSwipeBack={false} main className="safe-areas" url="/" />
        </App>
    );
};
export default MyApp;
