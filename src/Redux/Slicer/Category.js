import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {headersBuilder} from '../../helper';
import {initialState} from './User';

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
    async () => {
      try {
        const response = await Axios.get(`${BASE_URL}/category`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// get category by id
export const getCategoryById = createAsyncThunk(
    types.GET_CATEGORY_BY_ID,
    async (id) => {
      try {
        const response = await Axios.get(`${BASE_URL}/category/${id}`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// create category
export const createCategory = createAsyncThunk(
    types.CREATE_CATEGORY,
    async (category) => {
      try {
        const response = await Axios.post(`${BASE_URL}/category`, {
          ...headersBuilder(),
          ...category});
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// update category
export const updateCategory = createAsyncThunk(
    types.UPDATE_CATEGORY,
    async (category) => {
      try {
        const response = await Axios.put(`${BASE_URL}/category`, {
          ...headersBuilder(),
          ...category});
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// delete category
export const deleteCategory = createAsyncThunk(
    types.DELETE_CATEGORY,
    async (category) => {
      try {
        const response = await Axios.delete(
            `${BASE_URL}/category/${category.id}`, {
              ...headersBuilder(),
            });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// slicer
const categorySlice = createSlice({
  name: 'category',
  initialState: {...initialState},
  extraReducers: (builder) => {
    // get all category
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(getAllCategory.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
    });
    builder.addCase(getAllCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = null;
    });
    // get category by id
    builder.addCase(getCategoryById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(getCategoryById.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
    });
    builder.addCase(getCategoryById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = null;
    });
    // create category
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(createCategory.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = null;
    });
    // update category
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(updateCategory.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = null;
    });
    // delete category
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(deleteCategory.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = null;
    });
  },
});

export default categorySlice.reducer;
