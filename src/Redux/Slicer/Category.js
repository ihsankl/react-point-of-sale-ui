import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {headersBuilder, initialState, createBasicReducer} from '../../helper';

const BASE_URL = process.env.REACT_APP_API_URL;

const types = {
  GET_ALL_CATEGORY: 'getAllCategory',
  GET_CATEGORY_BY_ID: 'getCategoryById',
  CREATE_CATEGORY: 'createCategory',
  UPDATE_CATEGORY: 'updateCategory',
  DELETE_CATEGORY: 'deleteCategory',
};

// get all category
export const getAllCategory = createAsyncThunk(
    types.GET_ALL_CATEGORY,
    async (data = null, thunkAPI) => {
      try {
        const response = await Axios.get(`${BASE_URL}/category`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// get category by id
export const getCategoryById = createAsyncThunk(
    types.GET_CATEGORY_BY_ID,
    async (data, thunkAPI) => {
      try {
        const response = await Axios.get(`${BASE_URL}/category/${data.id}`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// create category
export const createCategory = createAsyncThunk(
    types.CREATE_CATEGORY,
    async (data, thunkAPI) => {
      try {
        await Axios.post(`${BASE_URL}/category`, data, {
          ...headersBuilder()});
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// update category
export const updateCategory = createAsyncThunk(
    types.UPDATE_CATEGORY,
    async (data, thunkAPI) => {
      try {
        await Axios.put(`${BASE_URL}/category/${data.id}`, data, {
          ...headersBuilder(),
        });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// delete category
export const deleteCategory = createAsyncThunk(
    types.DELETE_CATEGORY,
    async (data, thunkAPI) => {
      try {
        await Axios.delete(
            `${BASE_URL}/category/${data.id}`, {
              ...headersBuilder(),
            });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// slicer
const categorySlice = createSlice({
  name: 'category',
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
  },
  extraReducers: (builder) => {
    // get all category
    builder.addCase(getAllCategory.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(getAllCategory.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // get category by id
    builder.addCase(getCategoryById.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(getCategoryById.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(getCategoryById.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // create category
    builder.addCase(createCategory.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // update category
    builder.addCase(updateCategory.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // delete category
    builder.addCase(deleteCategory.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    }); builder.addCase(deleteCategory.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
  },
});

export const {clearError, clearSuccess} = categorySlice.actions;
export default categorySlice.reducer;
