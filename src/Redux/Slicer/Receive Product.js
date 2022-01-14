import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {headersBuilder, createBasicReducer, initialState} from '../../helper';

const BASE_URL = process.env.REACT_APP_API_URL;

const types = {
  GET_RECEIVE_PRODUCT: 'getReceiveProduct',
  GET_RECEIVE_PRODUCT_BY_ID: 'getReceiveProductById',
  CREATE_RECEIVE_PRODUCT: 'createReceiveProduct',
  UPDATE_RECEIVE_PRODUCT: 'updateReceiveProduct',
  DELETE_RECEIVE_PRODUCT: 'deleteReceiveProduct',
};

// get all receive product
export const getReceiveProduct = createAsyncThunk(
    types.GET_RECEIVE_PRODUCT,
    async (data = null, thunkAPI) => {
      try {
        const response = await Axios.get(`${BASE_URL}/receive_product`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// get receive product by id
export const getReceiveProductById = createAsyncThunk(
    types.GET_RECEIVE_PRODUCT_BY_ID,
    async (data, thunkAPI) => {
      try {
        const response = await Axios.get(
            `${BASE_URL}/receive_product/${data.id}`, {
              ...headersBuilder(),
            });
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// create receive product
export const createReceiveProduct = createAsyncThunk(
    types.CREATE_RECEIVE_PRODUCT,
    async (data, thunkAPI) => {
      try {
        await Axios.post(`${BASE_URL}/receive_product`, data, {
          ...headersBuilder(),
        });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// update receive product
export const updateReceiveProduct = createAsyncThunk(
    types.UPDATE_RECEIVE_PRODUCT,
    async (data, thunkAPI) => {
      try {
        await Axios.put(`${BASE_URL}/receive_product/${data.id}`, data, {
          ...headersBuilder(),
        });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// delete receive product
export const deleteReceiveProduct = createAsyncThunk(
    types.DELETE_RECEIVE_PRODUCT,
    async (data, thunkAPI) => {
      try {
        await Axios.delete(
            `${BASE_URL}/receive_product/${data.id}`, {
              ...headersBuilder(),
            });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// slicer
const receiveProductSlice = createSlice({
  name: 'receiveProduct',
  initialState: {...initialState},
  extraReducers: (builder) => {
    //   get all receive product
    builder.addCase(getReceiveProduct.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(getReceiveProduct.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(getReceiveProduct.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });

    // get receive product by id
    builder.addCase(getReceiveProductById.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(getReceiveProductById.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(getReceiveProductById.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });

    // create receive product
    builder.addCase(createReceiveProduct.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(createReceiveProduct.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(createReceiveProduct.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });

    // update receive product
    builder.addCase(updateReceiveProduct.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(updateReceiveProduct.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(updateReceiveProduct.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });

    // delete receive product
    builder.addCase(deleteReceiveProduct.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(deleteReceiveProduct.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(deleteReceiveProduct.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
  },
});

export default receiveProductSlice.reducer;
