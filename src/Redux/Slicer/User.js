import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {headersBuilder} from '../../helper';

const BASE_URL = process.env.REACT_APP_API_URL;

const types = {
  GET_USERS: 'getUsers',
  GET_USER_BY_ID: 'getUserById',
  CREATE_USER: 'createUser',
  UPDATE_USER: 'updateUser',
  DELETE_USER: 'deleteUser',
};

export const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  data: null,
};

// get all users
export const fetchUsers = createAsyncThunk(
    types.GET_USERS,
    async () => {
      try {
        const response = await Axios.get(`${BASE_URL}/user`);
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// get user by id
export const fetchUserById = createAsyncThunk(
    types.GET_USER_BY_ID,
    async (id) => {
      try {
        const response = await Axios.get(`${BASE_URL}/user/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// create user
export const createUser = createAsyncThunk(
    types.CREATE_USER,
    async (user) => {
      try {
        const response = await Axios.post(`${BASE_URL}/user`, user);
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// update user
export const updateUser = createAsyncThunk(
    types.UPDATE_USER,
    async (user) => {
      try {
        const response = await Axios.put(`${BASE_URL}/user/${user.id}`, {
          ...headersBuilder(),
          ...user,
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// delete user
export const deleteUser = createAsyncThunk(
    types.DELETE_USER,
    async (id) => {
      try {
        const response = await Axios.delete(`${BASE_URL}/user/${id}`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  extraReducers: (builder) => {
    // get users
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = action.payload;
    });
    // get user by id
    builder.addCase(fetchUserById.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
    },
    );
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    },
    );
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = action.payload;
    },
    );
    // create user
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
    },
    );
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    },
    );
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = action.payload;
    },
    );
    // update user
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
    },
    );
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    },
    );
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = action.payload;
    },
    );
    // delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
    },
    );
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    },
    );
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = action.payload;
    },
    );
  },
});

export default userSlice.reducer;
