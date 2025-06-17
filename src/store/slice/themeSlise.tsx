import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        
        theme: window.localStorage?.getItem('theme') || 'light',
        initaialTheme: document.documentElement.dataset.theme = window.localStorage?.getItem('theme') || 'light'
    },
    reducers: {
        setTheme: state => {
            state.theme === "dark" ? state.theme = "light" : state.theme = "dark"
            document.documentElement.dataset.theme = state.theme;
            localStorage.setItem("theme", state.theme);
        },

        getTheme: state => {state.theme}
    },
});

export const {setTheme} = themeSlice.actions

export default themeSlice.reducer