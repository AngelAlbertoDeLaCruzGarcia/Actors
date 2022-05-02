import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'movies',
    initialState: {
      value: [],
    },
    reducers: {
      add: (state,action) => {
        state.value = action.payload;
      },
    },
})

export const { add } = counterSlice.actions
export default counterSlice.reducer