import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {headersBuilder} from '../../helper';
import {initialState} from './User';

const BASE_URL = process.env.REACT_APP_API_URL;

const types = {
  GET_RECEIVE_PRODUCT: 'getReceiveProduct',
  GET_RECEIVE_PRODUCT_BY_ID: 'getReceiveProductById',
  CREATE_RECEIVE_PRODUCT: 'createReceiveProduct',
  UPDATE_RECEIVE_PRODUCT: 'updateReceiveProduct',
};

// get all receive product
export const getReceiveProduct = createAsyncThunk(
    types.GET_RECEIVE_PRODUCT,
    async () => {
      try {
        const response = await Axios.get(`${BASE_URL}/receive_product`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// get receive product by id
export const getReceiveProductById = createAsyncThunk(
    types.GET_RECEIVE_PRODUCT_BY_ID,
    async (id) => {
      try {
        const response = await Axios.get(`${BASE_URL}/receive_product/${id}`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// create receive product
export const createReceiveProduct = createAsyncThunk(
    types.CREATE_RECEIVE_PRODUCT,
    async (receiveProduct) => {
      try {
        const response = await Axios.post(`${BASE_URL}/receive_product`, {
          ...headersBuilder(),
          ...receiveProduct});
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// update receive product
export const updateReceiveProduct = createAsyncThunk(
    types.UPDATE_RECEIVE_PRODUCT,
    async (receiveProduct) => {
      try {
        const response = await Axios.put(`${BASE_URL}/receive_product`, {
          ...headersBuilder(),
          ...receiveProduct});
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// delete receive product
export const deleteReceiveProduct = createAsyncThunk(
    types.DELETE_RECEIVE_PRODUCT,
    async (id) => {
      try {
        const response = await Axios.delete(
            `${BASE_URL}/receive_product/${id}`, {
              ...headersBuilder(),
            });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// slicer
const receiveProductSlice = createSlice({
  name: 'receiveProduct',
  initialState: {...initialState},
  extraReducers: (builder) => {
    //   get all receive product
    builder.addCase(getReceiveProduct.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getReceiveProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = true;
    });
    builder.addCase(getReceiveProduct.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    // get receive product by id
    builder.addCase(getReceiveProductById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getReceiveProductById.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = true;
    });
    builder.addCase(getReceiveProductById.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.data = null;
    });
    // create receive product
    builder.addCase(createReceiveProduct.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(createReceiveProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = true;
    });
    builder.addCase(createReceiveProduct.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.data = null;
    });
    // update receive product
    builder.addCase(updateReceiveProduct.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(updateReceiveProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = true;
    });
    builder.addCase(updateReceiveProduct.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.data = null;
    });
    // delete receive product
    builder.addCase(deleteReceiveProduct.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(deleteReceiveProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = true;
    });
    builder.addCase(deleteReceiveProduct.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.data = null;
    });
  },
});

export default receiveProductSlice.reducer;
