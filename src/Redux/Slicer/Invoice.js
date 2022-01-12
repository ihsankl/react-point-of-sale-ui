import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {headersBuilder} from '../../helper';
import {initialState} from './User';

const BASE_URL = process.env.REACT_APP_API_URL;

const types = {
  GET_INVOICE: 'getInvoice',
  GET_INVOICE_BY_ID: 'getInvoiceById',
  CREATE_INVOICE: 'createInvoice',
  UPDATE_INVOICE: 'updateInvoice',
  DELETE_INVOICE: 'deleteInvoice',

};

// get all invoice
export const getInvoice = createAsyncThunk(
    types.GET_INVOICE,
    async () => {
      try {
        const response = await Axios.get(`${BASE_URL}/invoice`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// get invoice by id
export const getInvoiceById = createAsyncThunk(
    types.GET_INVOICE_BY_ID,
    async (id) => {
      try {
        const response = await Axios.get(`${BASE_URL}/invoice/${id}`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// create invoice
export const createInvoice = createAsyncThunk(
    types.CREATE_INVOICE,
    async (invoice) => {
      try {
        const response = await Axios.post(`${BASE_URL}/invoice`, {
          ...headersBuilder(),
          ...invoice});
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// update invoice
export const updateInvoice = createAsyncThunk(
    types.UPDATE_INVOICE,
    async (invoice) => {
      try {
        const response = await Axios.put(`${BASE_URL}/invoice/${invoice.id}`, {
          ...headersBuilder(),
          ...invoice});
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// delete invoice
export const deleteInvoice = createAsyncThunk(
    types.DELETE_INVOICE,
    async (id) => {
      try {
        const response = await Axios.delete(`${BASE_URL}/invoice/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// slicer
const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getInvoice.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
    });
    builder.addCase(getInvoice.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(getInvoice.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = null;
    });

    builder.addCase(getInvoiceById.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(getInvoiceById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(getInvoiceById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = null;
    });

    builder.addCase(createInvoice.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
    });
    builder.addCase(createInvoice.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(createInvoice.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = null;
    },
    );
  },
});

export default invoiceSlice.reducer;
