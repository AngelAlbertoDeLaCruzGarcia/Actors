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
}
/*,{
    name: 'Movies',
    initialState: {
      value: [],
    },
    reducers: {
      add: (state,action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.value = action.payload;
      },
    },

}
*/
)

// Action creators are generated for each case reducer function
export const { add } = counterSlice.actions

export default counterSlice.reducer