import {createSlice} from '@reduxjs/toolkit';

const appStateSlice = createSlice({
  name: 'appState',
  initialState: {
    username: null,
    userData: null,
    isSuccess: false,
    pageMounted: {
      customer: false,
      invoice: false,
      product: false,
      category: false,
      unit: false,
      purchase_order: false,
      receive_product: false,
      supplier: false,
    },
  },
  reducers: {
    setusername: (state, action) => {
      state.username = action.payload;
    },
    unsetUsername: (state, action) => {
      state.username = null;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    unsetUserData: (state, action) => {
      state.userData = null;
    },
    setSuccess: (state, action) => {
      state.isSuccess = true;
    },
    unsetSuccess: (state, action) => {
      state.isSuccess = false;
    },
    setMountPage: (state, action) => {
      state.pageMounted[action.payload] = true;
    },
    unsetMountPage: (state, action) => {
      state.pageMounted[action.payload] = false;
    },
  },
});

export const {
  setusername,
  unsetUsername,
  setUserData,
  unsetUserData,
  setSuccess,
  unsetSuccess,
  setMountPage,
  unsetMountPage,
} = appStateSlice.actions;
export default appStateSlice.reducer;
