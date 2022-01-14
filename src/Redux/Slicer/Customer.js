import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {createBasicReducer, headersBuilder, initialState} from '../../helper';

const BASE_URL = process.env.REACT_APP_API_URL;

const types = {
  GET_CUSTOMERS: 'getCustomers',
  GET_CUSTOMER_BY_ID: 'getCustomerById',
  CREATE_CUSTOMER: 'createCustomer',
  UPDATE_CUSTOMER: 'updateCustomer',
  DELETE_CUSTOMER: 'deleteCustomer',
};

// get all customers
export const getCustomers = createAsyncThunk(
    types.GET_CUSTOMERS,
    async (data = null, thunkAPI) => {
      try {
        const response = await Axios.get(`${BASE_URL}/customer`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// get customer by id
export const getCustomerById = createAsyncThunk(
    types.GET_CUSTOMER_BY_ID,
    async (data, thunkAPI) => {
      try {
        const response = await Axios.get(`${BASE_URL}/customer/${data.id}`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// create customer
export const createCustomer = createAsyncThunk(
    types.CREATE_CUSTOMER,
    async (data, thunkAPI) => {
      try {
        await Axios.post(`${BASE_URL}/customer`, data, {
          ...headersBuilder()});
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// update customer
export const updateCustomer = createAsyncThunk(
    types.UPDATE_CUSTOMER,
    async (data, thunkAPI) => {
      try {
        await Axios.put(`${BASE_URL}/customer/${data.id}`, data,
            {...headersBuilder()},
        );
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// delete customer
export const deleteCustomer = createAsyncThunk(
    types.DELETE_CUSTOMER,
    async (data, thunkAPI) => {
      try {
        await Axios.delete(`${BASE_URL}/customer/${data.id}`, {
          ...headersBuilder(),
        });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

const customerSlice = createSlice({
  name: 'customer',
  initialState: {...initialState},
  extraReducers: (builder) => {
    // get all
    builder.addCase(getCustomers.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(getCustomers.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(getCustomers.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // get 1
    builder.addCase(getCustomerById.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(getCustomerById.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(getCustomerById.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // create
    builder.addCase(createCustomer.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(createCustomer.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(createCustomer.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // update
    builder.addCase(updateCustomer.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(updateCustomer.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // delete
    builder.addCase(deleteCustomer.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(deleteCustomer.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
  },
});

export default customerSlice.reducer;
