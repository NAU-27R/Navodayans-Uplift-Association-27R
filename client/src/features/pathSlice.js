import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "home",
}

export const pathSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    setPath: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPath} = pathSlice.actions

export default pathSlice.reducer