import { setLogoutCallback } from '@/services/axiosInstance';
import { configureStore } from '@reduxjs/toolkit';

import auth, { actionLogout } from './slices/auth';

export const store = configureStore({
    reducer: {
        auth,
    },
});

// Set up the logout callback to break circular dependency
setLogoutCallback(() => {
    store.dispatch(actionLogout());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
