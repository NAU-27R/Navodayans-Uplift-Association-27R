import { configureStore } from '@reduxjs/toolkit'
import pathReducer from '../features/pathSlice.js'

export const store = configureStore({
  reducer: {
    path: pathReducer,
  },
})