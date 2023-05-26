
import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('login') || false;

export const loginSlice = createSlice({
    name: 'entries',
    initialState,
    reducers: {
        login: (state) => {
            state = true

            localStorage.setItem('login', JSON.stringify(state))
            return state
        },
        logout: (state) => {
            state = false
            localStorage.setItem('login', JSON.stringify(state))
            return state
        },
    }
});

export const { login, logout } = loginSlice.actions

export default loginSlice.reducer