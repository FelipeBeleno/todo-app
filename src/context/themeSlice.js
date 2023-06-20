//themeSlice

import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('theme'));

export const themeSlice = createSlice({
    name: 'theme',
    initialState,   
    reducers: {
        changeTheme: (state, action) => {
            state = action.payload
            return state
        },
    }
});

export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer