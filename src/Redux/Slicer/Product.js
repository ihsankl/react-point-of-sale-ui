import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {headersBuilder, createBasicReducer, initialState} from '../../helper';

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
    async (data = null, thunkAPI) => {
      try {
        const res = await Axios.get(`${BASE_URL}/product`, {
          ...headersBuilder(),
        });
        return res.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// get product by id
export const getProductById = createAsyncThunk(
    types.GET_PRODUCT_BY_ID,
    async (data, thunkAPI) => {
      try {
        const res = await Axios.get(`${BASE_URL}/product/${data.id}`, {
          ...headersBuilder(),
        });
        return res.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// create product
export const createProduct = createAsyncThunk(
    types.CREATE_PRODUCT,
    async (data, thunkAPI) => {
      try {
        await Axios.post(`${BASE_URL}/product`, data, {
          ...headersBuilder(),
        });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// update product
export const updateProduct = createAsyncThunk(
    types.UPDATE_PRODUCT,
    async (data, thunkAPI) => {
      try {
        await Axios.put(`${BASE_URL}/product/${data.id}`, data, {
          ...headersBuilder(),
        });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// delete product
export const deleteProduct = createAsyncThunk(
    types.DELETE_PRODUCT,
    async (data, thunkAPI) => {
      try {
        await Axios.delete(
            `${BASE_URL}/product/${data.id}`, {
              ...headersBuilder(),
            });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// slicer
export const productSlice = createSlice({
  name: 'product',
  initialState: {...initialState},
  extraReducers: (builder) => {
    // get all product
    builder.addCase(getProduct.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // get 1
    builder.addCase(getProductById.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // create product
    builder.addCase(createProduct.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // update product
    builder.addCase(updateProduct.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // delete product
    builder.addCase(deleteProduct.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    },
    );
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    },
    );
    builder.addCase(deleteProduct.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
  },
});

export default productSlice.reducer;
