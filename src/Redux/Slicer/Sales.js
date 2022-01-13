import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const salesSlice = createSlice({
  name: 'sales',
  initialState: {...initialState},
  reducers: {
    cart: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {cart} = salesSlice.actions;
export default salesSlice.reducer;
