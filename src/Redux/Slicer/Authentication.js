import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {headersBuilder, initialState, createBasicReducer} from '../../helper';

const BASE_URL = process.env.REACT_APP_API_URL;

const types = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  CHECK_TOKEN: 'checkToken',
};

// user login
export const login = createAsyncThunk(
    types.LOGIN,
    async (data, thunkAPI) => {
      try {
        const response = await Axios.post(`${BASE_URL}/login`, data);
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// user logout
export const logout = createAsyncThunk(
    types.LOGOUT,
    async (data = null, thunkAPI) => {
      try {
        const response = await Axios.post(`${BASE_URL}/logout`,
            {
              ...headersBuilder(),
            },
        );
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// check token
export const checkToken = createAsyncThunk(
    types.CHECK_TOKEN,
    async (data = null, thunkAPI) => {
      try {
        const response = await Axios.get(`${BASE_URL}/checkToken`,
            {
              ...headersBuilder(),
            },
        );
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {...initialState},
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(login.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(login.rejected, (state) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // logout
    builder.addCase(logout.pending, (state) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(logout.fulfilled, (state) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(logout.rejected, (state) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // check token
    builder.addCase(checkToken.pending, (state) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(checkToken.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(checkToken.rejected, (state) => {
      createBasicReducer(state, action, 'REJECTED');
    });
  },
});

export default authenticationSlice.reducer;
