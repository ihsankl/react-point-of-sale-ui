import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {headersBuilder} from '../../helper';
import {initialState} from './User';

const BASE_URL = process.env.REACT_APP_API_URL;

const types = {
  GET_PRODUCT: 'getProduct',
  GET_PRODUCT_BY_ID: 'getProductById',
  CREATE_PRODUCT: 'createProduct',
  UPDATE_PRODUCT: 'updateProduct',
  DELETE_PRODUCT: 'deleteProduct',

};

// get all product
export const getProduct = createAsyncThunk(
    types.GET_PRODUCT,
    async () => {
      try {
        const response = await Axios.get(`${BASE_URL}/product`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// get product by id
export const getProductById = createAsyncThunk(
    types.GET_PRODUCT_BY_ID,
    async (id) => {
      try {
        const response = await Axios.get(`${BASE_URL}/product/${id}`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// create product
export const createProduct = createAsyncThunk(
    types.CREATE_PRODUCT,
    async (product) => {
      try {
        const response = await Axios.post(`${BASE_URL}/product`, {
          ...headersBuilder(),
          ...product});
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// update product
export const updateProduct = createAsyncThunk(
    types.UPDATE_PRODUCT,
    async (product) => {
      try {
        const response = await Axios.put(`${BASE_URL}/product`, {
          ...headersBuilder(),
          ...product});
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// delete product
export const deleteProduct = createAsyncThunk(
    types.DELETE_PRODUCT,
    async (product) => {
      try {
        const response = await Axios.delete(
            `${BASE_URL}/product/${product.id}`, {
              ...headersBuilder(),
            });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// slicer
export const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = null;
    });
    builder.addCase(createProduct.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = null;
    });
    builder.addCase(updateProduct.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = null;
    });
    builder.addCase(deleteProduct.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
    },
    );
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = action.payload;
    },
    );
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = null;
    },
    );
  },
});

export default productSlice.reducer;
