import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {headersBuilder, createBasicReducer, initialState} from '../../helper';

const BASE_URL = process.env.REACT_APP_API_URL;

const types = {
  GET_PRODUCT_UNIT: 'getProductUnit',
  GET_PRODUCT_UNIT_BY_ID: 'getProductUnitById',
  CREATE_PRODUCT_UNIT: 'createProductUnit',
  UPDATE_PRODUCT_UNIT: 'updateProductUnit',
  DELETE_PRODUCT_UNIT: 'deleteProductUnit',
};

// get all product category
export const getProductUnit = createAsyncThunk(
    types.GET_PRODUCT_UNIT,
    async (data = null, thunkAPI) => {
      try {
        const response = await Axios.get(`${BASE_URL}/product_unit`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// get product category by id
export const getProductUnitById = createAsyncThunk(
    types.GET_PRODUCT_UNIT_BY_ID,
    async (data, thunkAPI) => {
      try {
        const response = await Axios.get(
            `${BASE_URL}/product_unit/${data.id}`, {
              ...headersBuilder(),
            });
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// create product category
export const createProductUnit = createAsyncThunk(
    types.CREATE_PRODUCT_UNIT,
    async (data, thunkAPI) => {
      try {
        await Axios.post(`${BASE_URL}/product_unit`, data, {
          ...headersBuilder(),
        });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// update product category
export const updateProductUnit = createAsyncThunk(
    types.UPDATE_PRODUCT_UNIT,
    async (data, thunkAPI) => {
      try {
        await Axios.put(
            `${BASE_URL}/product_unit/${data.id}`, data,
            {
              ...headersBuilder(),
            });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// delete product category
export const deleteProductUnit = createAsyncThunk(
    types.DELETE_PRODUCT_UNIT,
    async (data, thunkAPI) => {
      try {
        await Axios.delete(`${BASE_URL}/product_unit/${data.id}`, {
          ...headersBuilder(),
        });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// slicer
const productUnitSlice = createSlice({
  name: 'productUnit',
  initialState: {
    ...initialState,
  },
  extraReducers: (builder) => {
    //   get all product unit
    builder.addCase(getProductUnit.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(getProductUnit.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(getProductUnit.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    //   get product unit by id
    builder.addCase(getProductUnitById.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(getProductUnitById.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(getProductUnitById.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    //   create product unit
    builder.addCase(createProductUnit.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(createProductUnit.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(createProductUnit.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    //   update product unit
    builder.addCase(updateProductUnit.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(updateProductUnit.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(updateProductUnit.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    //   delete product unit
    builder.addCase(deleteProductUnit.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(deleteProductUnit.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(deleteProductUnit.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
  },
});

export default productUnitSlice.reducer;
