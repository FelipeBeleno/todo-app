//themeSlice

import { createSlice } from '@reduxjs/toolkit'

const initialState = true;

export const themeSlice = createSlice({
    name: 'entries',
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