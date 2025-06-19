import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './slice/themeSlise';
import statusReducer from './slice/statusSlice';
import {fetchStatus} from './slice/statusSlice';
  
export const store = configureStore({
    reducer: {
        theme: themeReducer,
        status: statusReducer,
    }
});

// запрос статусов к серверу
store.dispatch(fetchStatus());

// экспорт типа для store
export type StoreState = ReturnType<typeof store.getState>;