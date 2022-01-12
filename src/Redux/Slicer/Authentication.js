import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {headersBuilder} from '../../helper';
import {initialState} from './User';

const BASE_URL = process.env.REACT_APP_API_URL;

const types = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  CHECK_TOKEN: 'checkToken',
};

// user login
export const login = createAsyncThunk(
    types.LOGIN,
    async (user) => {
      try {
        const response = await Axios.post(`${BASE_URL}/login`, user);
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// user logout
export const logout = createAsyncThunk(
    types.LOGOUT,
    async () => {
      try {
        const response = await Axios.post(`${BASE_URL}/logout`,
            {
              ...headersBuilder(),
            },
        );
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// check token
export const checkToken = createAsyncThunk(
    types.CHECK_TOKEN,
    async () => {
      try {
        const response = await Axios.get(`${BASE_URL}/checkToken`,
            {
              ...headersBuilder(),
            },
        );
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.data = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(logout.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(checkToken.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(checkToken.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(checkToken.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default authenticationSlice.reducer;
