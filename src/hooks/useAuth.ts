import api from 'zmp-sdk';
import store from '../store';

const useAuth = () => {
    const login = () => {
        api.login({
            success: async () => {
                const { userInfo } = await api.getUserInfo({
                    fail: error => {
                        console.error('getUserInfo|error', error);
                    },
                });
                store.dispatch('setUser', userInfo);
            },
            fail: error => {
                console.error('login error', error);
            },
        });
    };

    return { login };
};
export default useAuth;
