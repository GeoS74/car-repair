import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './slice/themeSlise'; 
  
export default configureStore({
    reducer: {
        theme: themeReducer,
    }
});