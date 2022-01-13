import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {headersBuilder} from '../../helper';
import {initialState} from './User';

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
    async () => {
      try {
        const response = await Axios.get(`${BASE_URL}/customer`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// get customer by id
export const getCustomerById = createAsyncThunk(
    types.GET_CUSTOMER_BY_ID,
    async (id) => {
      try {
        const response = await Axios.get(`${BASE_URL}/customer/${id}`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// create customer
export const createCustomer = createAsyncThunk(
    types.CREATE_CUSTOMER,
    async (customer) => {
      try {
        const response = await Axios.post(`${BASE_URL}/customer`, {
          ...headersBuilder(),
          ...customer});
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// update customer
export const updateCustomer = createAsyncThunk(
    types.UPDATE_CUSTOMER,
    async (customer) => {
      try {
        const response = await Axios.put(`${BASE_URL}/customer/${customer.id}`,
            {...headersBuilder(), ...customer},
        );
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// delete customer
export const deleteCustomer = createAsyncThunk(
    types.DELETE_CUSTOMER,
    async (id) => {
      try {
        const response = await Axios.delete(`${BASE_URL}/customer/${id}`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

const customerSlice = createSlice({
  name: 'customer',
  initialState: {...initialState},
  extraReducers: (builder) => {
    builder.addCase(getCustomers.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
    });
    builder.addCase(getCustomers.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(getCustomers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = action.payload;
    });

    builder.addCase(getCustomerById.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
    });
    builder.addCase(getCustomerById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(getCustomerById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = action.payload;
    });

    builder.addCase(createCustomer.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
    });
    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(createCustomer.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = action.payload;
    });

    builder.addCase(updateCustomer.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
    });
    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    },
    );
    builder.addCase(updateCustomer.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = action.payload;
    },
    );
  },
});

export default customerSlice.reducer;
