import { configureStore } from '@reduxjs/toolkit'
import entriesSlice from './entriesSlice'
import themeSlice from './themeSlice'
import loginSlice from './loginSlice'

export const store = configureStore({
  reducer: {
    entries: entriesSlice,
    theme: themeSlice,
    login: loginSlice,
  },
})