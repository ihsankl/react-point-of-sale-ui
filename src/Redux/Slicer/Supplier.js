import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {headersBuilder} from '../../helper';
import {initialState} from './User';

const BASE_URL = process.env.REACT_APP_API_URL;

const types = {
  GET_SUPPLIER: 'getSupplier',
  GET_SUPPLIER_BY_ID: 'getSupplierById',
  CREATE_SUPPLIER: 'createSupplier',
  UPDATE_SUPPLIER: 'updateSupplier',
  DELETE_SUPPLIER: 'deleteSupplier',
};

// get all supplier
export const getSupplier = createAsyncThunk(
    types.GET_SUPPLIER,
    async () => {
      try {
        const response = await Axios.get(`${BASE_URL}/supplier`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// get supplier by id
export const getSupplierById = createAsyncThunk(
    types.GET_SUPPLIER_BY_ID,
    async (id) => {
      try {
        const response = await Axios.get(`${BASE_URL}/supplier/${id}`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);


// create supplier
export const createSupplier = createAsyncThunk(
    types.CREATE_SUPPLIER,
    async (supplier) => {
      try {
        const response = await Axios.post(`${BASE_URL}/supplier`, {
          ...headersBuilder(),
          ...supplier});
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// update supplier
export const updateSupplier = createAsyncThunk(
    types.UPDATE_SUPPLIER,
    async (supplier) => {
      try {
        const response = await Axios.put(`${BASE_URL}/supplier`, {
          ...headersBuilder(),
          ...supplier});
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// delete supplier
export const deleteSupplier = createAsyncThunk(
    types.DELETE_SUPPLIER,
    async (id) => {
      try {
        const response = await Axios.delete(`${BASE_URL}/supplier/${id}`, {
          ...headersBuilder()});
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// slicer
const supplierSlice = createSlice({
  name: 'supplier',
  initialState: {...initialState},
  extraReducers: (builder) => {
    //   get supplier
    builder.addCase(getSupplier.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getSupplier.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = true;
    });
    builder.addCase(getSupplier.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.data = null;
    });
    //   get supplier by id
    builder.addCase(getSupplierById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getSupplierById.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = true;
    });
    builder.addCase(getSupplierById.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.data = null;
    });
    //   create supplier
    builder.addCase(createSupplier.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(createSupplier.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = true;
    });
    builder.addCase(createSupplier.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.data = null;
    });
    //   update supplier
    builder.addCase(updateSupplier.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(updateSupplier.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = true;
    });
    builder.addCase(updateSupplier.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.data = null;
    });
    //   delete supplier
    builder.addCase(deleteSupplier.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(deleteSupplier.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = true;
    });
    builder.addCase(deleteSupplier.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.data = null;
    });
  },
});

export default supplierSlice.reducer;
