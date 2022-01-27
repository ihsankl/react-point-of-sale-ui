import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {headersBuilder, initialState} from '../../helper';

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
        const response = await Axios.post(
            `${BASE_URL}/authentication/login`, data);
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
        const response = await Axios.post(
            `${BASE_URL}/authentication/logout`,
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
        const response = await Axios.get(
            `${BASE_URL}/authentication/check`,
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
  initialState: {...initialState, isLoggedIn: false},
  reducers: {
    clearError: (state) => {
      state.error = {
        state: false,
        message: null,
      };
    },
    clearSuccess: (state) => {
      state.isSuccess = false;
    },
    clearToken: (state) => {
      localStorage.removeItem('token');
      state.isLoggedIn = false;
    },
  }, extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
      state.error = {
        message: null,
        state: false,
      };
      state.token = null;
      state.isSuccess = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = {
        message: null,
        state: false,
      };
      state.isSuccess = true;
      state.isLoggedIn = true;
      localStorage.setItem('token', action.payload.data);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = {
        message: action.payload?.response?.data?.message ??
        'Something went wrong',
        state: true,
      };
      state.isSuccess = false;
    });
    // logout
    builder.addCase(logout.pending, (state, action) => {
      state.isLoading = true;
      state.error = {
        message: null,
        state: false,
      };
      state.isSuccess = false;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = {
        message: null,
        state: false,
      };
      state.isSuccess = true;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = {
        message: action.payload?.response?.data?.message ??
        'Something went wrong',
        state: true,
      };
      state.isSuccess = false;
    });
    // check token
    builder.addCase(checkToken.pending, (state, action) => {
      state.isLoading = true;
      state.error = {
        message: null,
        state: false,
      };
      state.isSuccess = false;
      state.isLoggedIn = true;
    });
    builder.addCase(checkToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = {
        message: null,
        state: false,
      };
      state.isSuccess = true;
      state.isLoggedIn = true;
      localStorage.setItem('token', action.payload.data);
    });
    builder.addCase(checkToken.rejected, (state, action) => {
      state.isLoading = false;
      state.error = {
        message: action.payload?.response?.data?.message ??
        'Something went wrong',
        state: true,
      };
      state.isSuccess = false;
    });
  },
});

export const {
  clearError,
  clearSuccess,
  clearToken,
} = authenticationSlice.actions;
export default authenticationSlice.reducer;
