import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {headersBuilder} from '../../helper';
import {initialState} from './User';

const BASE_URL = process.env.REACT_APP_API_URL;

const types = {
  GET_PURCHASE_ORDER: 'getPurchaseOrder',
  GET_PURCHASE_ORDER_BY_ID: 'getPurchaseOrderById',
  CREATE_PURCHASE_ORDER: 'createPurchaseOrder',
  UPDATE_PURCHASE_ORDER: 'updatePurchaseOrder',
  DELETE_PURCHASE_ORDER: 'deletePurchaseOrder',
};

// get all purchase order
export const getPurchaseOrder = createAsyncThunk(
    types.GET_PURCHASE_ORDER,
    async () => {
      try {
        const response = await Axios.get(`${BASE_URL}/purchase_order`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// get purchase order by id
export const getPurchaseOrderById = createAsyncThunk(
    types.GET_PURCHASE_ORDER_BY_ID,
    async (id) => {
      try {
        const response = await Axios.get(`${BASE_URL}/purchase_order/${id}`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// create purchase order
export const createPurchaseOrder = createAsyncThunk(
    types.CREATE_PURCHASE_ORDER,
    async (purchaseOrder) => {
      try {
        const response = await Axios.post(`${BASE_URL}/purchase_order`, {
          ...headersBuilder(),
          ...purchaseOrder});
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// update purchase order
export const updatePurchaseOrder = createAsyncThunk(
    types.UPDATE_PURCHASE_ORDER,
    async (purchaseOrder) => {
      try {
        const response = await Axios.put(
            `${BASE_URL}/purchase_order/${purchaseOrder.id}`, {
              ...headersBuilder(),
              ...purchaseOrder},
        );
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// delete purchase order
export const deletePurchaseOrder = createAsyncThunk(
    types.DELETE_PURCHASE_ORDER,
    async (id) => {
      try {
        const response = await Axios.delete(
            `${BASE_URL}/purchase_order/${id}`, {
              ...headersBuilder(),
            });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
);

// slicer
const purchaseOrderSlice = createSlice({
  name: 'purchaseOrder',
  initialState: {...initialState},
  extraReducers: (builder) => {
    // get all purchase order
    builder.addCase(getPurchaseOrder.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getPurchaseOrder.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.data = null;
    });
    builder.addCase(getPurchaseOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.data = null;
    });
    // get purchase order by id
    builder.addCase(getPurchaseOrderById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getPurchaseOrderById.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.data = null;
    });
    builder.addCase(getPurchaseOrderById.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.data = null;
    });
    // create purchase order
    builder.addCase(createPurchaseOrder.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(createPurchaseOrder.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.data = null;
    });
    builder.addCase(createPurchaseOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.data = null;
    });
    // update purchase order
    builder.addCase(updatePurchaseOrder.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(updatePurchaseOrder.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.data = null;
    });
    builder.addCase(updatePurchaseOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.data = null;
    });
    // delete purchase order
    builder.addCase(deletePurchaseOrder.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
  },
});

export default purchaseOrderSlice.reducer;
