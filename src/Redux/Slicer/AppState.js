import {createSlice} from '@reduxjs/toolkit';

const appStateSlice = createSlice({
  name: 'appState',
  initialState: {
    mounted: false,
    mountedWithToken: false,
    username: null,
    userData: null,
    isSuccess: false,
  },
  reducers: {
    mountApp: (state, action) => {
      state.mounted = true;
    },
    unmountApp: (state, action) => {
      state.mounted = false;
    },
    mountAppWithToken: (state, action) => {
      state.mountedWithToken = true;
    },
    unmountAppWithToken: (state, action) => {
      state.mountedWithToken = false;
    },
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

  },
});

export const {
  mountApp,
  unmountApp,
  mountAppWithToken,
  unmountAppWithToken,
  setusername,
  unsetUsername,
  setUserData,
  unsetUserData,
  setSuccess,
  unsetSuccess,
} = appStateSlice.actions;
export default appStateSlice.reducer;
