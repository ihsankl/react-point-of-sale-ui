import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {headersBuilder} from '../../helper';
import {initialState} from './User';

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
    async () => {
      try {
        const response = await Axios.get(`${BASE_URL}/product_unit`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// get product category by id
export const getProductUnitById = createAsyncThunk(
    types.GET_PRODUCT_UNIT_BY_ID,
    async (id) => {
      try {
        const response = await Axios.get(`${BASE_URL}/product_unit/${id}`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// create product category
export const createProductUnit = createAsyncThunk(
    types.CREATE_PRODUCT_UNIT,
    async (productUnit) => {
      try {
        const response = await Axios.post(`${BASE_URL}/product_unit`, {
          ...headersBuilder(),
          ...productUnit});
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// update product category
export const updateProductUnit = createAsyncThunk(
    types.UPDATE_PRODUCT_UNIT,
    async (productUnit) => {
      try {
        const response = await Axios.put(
            `${BASE_URL}/product_unit/${productUnit.id}`,
            {
              ...headersBuilder(),
              ...productUnit,
            });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// delete product category
export const deleteProductUnit = createAsyncThunk(
    types.DELETE_PRODUCT_UNIT,
    async (id) => {
      try {
        const response = await Axios.delete(`${BASE_URL}/product_unit/${id}`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
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
    builder.addCase(getProductUnit.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getProductUnit.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(getProductUnit.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    });
    //   get product unit by id
    builder.addCase(getProductUnitById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getProductUnitById.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(getProductUnitById.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    });
    //   create product unit
    builder.addCase(createProductUnit.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(createProductUnit.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(createProductUnit.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    });
    //   update product unit
    builder.addCase(updateProductUnit.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(updateProductUnit.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(updateProductUnit.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    });
    //   delete product unit
    builder.addCase(deleteProductUnit.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(deleteProductUnit.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.data = null;
    });
    builder.addCase(deleteProductUnit.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.data = null;
    });
  },
});

export default productUnitSlice.reducer;
