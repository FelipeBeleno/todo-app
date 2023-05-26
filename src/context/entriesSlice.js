import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

export const entriesSlice = createSlice({
    name: 'entries',
    initialState,
    reducers: {
        setInitial: (state, action) => {
            state = action.payload
            return state
        },
        addEntry: (state, action) => {


            state.push(action.payload)
            localStorage.setItem('entries', JSON.stringify(state))

            return state
        },
        removeEntry: (state, action) => {
            let data = state.filter(d => d._id !== action.payload._id)
            state = data

            localStorage.setItem('entries', JSON.stringify(state))

            return state
        },
        editEntry: (state, action) => {
            console.log(action.payload)
            let data = state.map(e => {
                if (e._id === action.payload._id) {
                    return {
                        ...e,
                        ...action.payload
                    }
                }
                return e
            })
            state = [...data]
            localStorage.setItem('entries', JSON.stringify(state))
            return state
        },
        deleteEntry: (state, action) => {


            state = state.filter(e => e._id !== action.payload)
            localStorage.setItem('entries', JSON.stringify(state))
            return state
        }
    }
});

export const { setInitial, addEntry, removeEntry, editEntry, deleteEntry } = entriesSlice.actions

export default entriesSlice.reducer