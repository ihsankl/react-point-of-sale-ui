import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {headersBuilder, createBasicReducer, initialState} from '../../helper';

const BASE_URL = process.env.REACT_APP_API_URL;

const types = {
  GET_USERS: 'getUsers',
  GET_USER_BY_ID: 'getUserById',
  CREATE_USER: 'createUser',
  UPDATE_USER: 'updateUser',
  DELETE_USER: 'deleteUser',
};

// get all users
export const fetchUsers = createAsyncThunk(
    types.GET_USERS,
    async (data = null, thunkAPI) => {
      try {
        const response = await Axios.get(`${BASE_URL}/user`);
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// get user by id
export const fetchUserById = createAsyncThunk(
    types.GET_USER_BY_ID,
    async (data, thunkAPI) => {
      try {
        const response = await Axios.get(`${BASE_URL}/user/${data.id}`);
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// create user
export const createUser = createAsyncThunk(
    types.CREATE_USER,
    async (data, thunkAPI) => {
      try {
        await Axios.post(`${BASE_URL}/user`, data);
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// update user
export const updateUser = createAsyncThunk(
    types.UPDATE_USER,
    async (data, thunkAPI) => {
      try {
        await Axios.put(`${BASE_URL}/user/${data.id}`, data, {
          ...headersBuilder(),

        });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// delete user
export const deleteUser = createAsyncThunk(
    types.DELETE_USER,
    async (data, thunkAPI) => {
      try {
        await Axios.delete(`${BASE_URL}/user/${data.id}`, {
          ...headersBuilder(),
        });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {...initialState},
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
  }, extraReducers: (builder) => {
    // get users
    builder.addCase(fetchUsers.pending, (state) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // get user by id
    builder.addCase(fetchUserById.pending, (state) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // create user
    builder.addCase(createUser.pending, (state) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(createUser.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // update user
    builder.addCase(updateUser.pending, (state) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // delete user
    builder.addCase(deleteUser.pending, (state) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
  },
});

export const {clearError, clearSuccess} = userSlice.actions;
export default userSlice.reducer;
