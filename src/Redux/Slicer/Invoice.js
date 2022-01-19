import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {headersBuilder, createBasicReducer, initialState} from '../../helper';

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
    async (data = null, thunkAPI) => {
      try {
        const response = await Axios.get(`${BASE_URL}/invoice`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// get invoice by id
export const getInvoiceById = createAsyncThunk(
    types.GET_INVOICE_BY_ID,
    async (data, thunkAPI) => {
      try {
        const response = await Axios.get(`${BASE_URL}/invoice/${data.id}`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// create invoice
export const createInvoice = createAsyncThunk(
    types.CREATE_INVOICE,
    async (data, thunkAPI) => {
      try {
        await Axios.post(`${BASE_URL}/invoice`, data, {
          ...headersBuilder(),
        });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// update invoice
export const updateInvoice = createAsyncThunk(
    types.UPDATE_INVOICE,
    async (data, thunkAPI) => {
      try {
        await Axios.put(`${BASE_URL}/invoice/${data.id}`, data, {
          ...headersBuilder(),
        });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// delete invoice
export const deleteInvoice = createAsyncThunk(
    types.DELETE_INVOICE,
    async (data, thunkAPI) => {
      try {
        await Axios.delete(`${BASE_URL}/invoice/${data.id}`, {
          ...headersBuilder(),
        });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// slicer
const invoiceSlice = createSlice({
  name: 'invoice',
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
    // get all
    builder.addCase(getInvoice.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(getInvoice.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(getInvoice.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // get 1
    builder.addCase(getInvoiceById.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(getInvoiceById.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(getInvoiceById.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // create
    builder.addCase(createInvoice.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(createInvoice.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(createInvoice.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // update
    builder.addCase(updateInvoice.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(updateInvoice.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(updateInvoice.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // delete
    builder.addCase(deleteInvoice.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(deleteInvoice.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(deleteInvoice.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
  },
});

export const {clearError, clearSuccess} = invoiceSlice.actions;
export default invoiceSlice.reducer;
