import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {headersBuilder, createBasicReducer, initialState} from '../../helper';

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
    async (data = null, thunkAPI) => {
      try {
        const response = await Axios.get(`${BASE_URL}/purchase_order`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// get purchase order by id
export const getPurchaseOrderById = createAsyncThunk(
    types.GET_PURCHASE_ORDER_BY_ID,
    async (data, thunkAPI) => {
      try {
        const res = await Axios.get(`${BASE_URL}/purchase_order/${data.id}`, {
          ...headersBuilder(),
        });
        return res.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// create purchase order
export const createPurchaseOrder = createAsyncThunk(
    types.CREATE_PURCHASE_ORDER,
    async (data, thunkAPI) => {
      try {
        await Axios.post(`${BASE_URL}/purchase_order`, data, {
          ...headersBuilder(),
        });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// update purchase order
export const updatePurchaseOrder = createAsyncThunk(
    types.UPDATE_PURCHASE_ORDER,
    async (data, thunkAPI) => {
      try {
        await Axios.put(
            `${BASE_URL}/purchase_order/${data.id}`, data, {
              ...headersBuilder(),
            },
        );
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// delete purchase order
export const deletePurchaseOrder = createAsyncThunk(
    types.DELETE_PURCHASE_ORDER,
    async (data, thunkAPI) => {
      try {
        await Axios.delete(
            `${BASE_URL}/purchase_order/${data.id}`, {
              ...headersBuilder(),
            });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// slicer
const purchaseOrderSlice = createSlice({
  name: 'purchaseOrder',
  initialState: {...initialState},
  extraReducers: (builder) => {
    // get all purchase order
    builder.addCase(getPurchaseOrder.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(getPurchaseOrder.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(getPurchaseOrder.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // get purchase order by id
    builder.addCase(getPurchaseOrderById.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(getPurchaseOrderById.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(getPurchaseOrderById.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // create purchase order
    builder.addCase(createPurchaseOrder.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(createPurchaseOrder.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(createPurchaseOrder.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // update purchase order
    builder.addCase(updatePurchaseOrder.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(updatePurchaseOrder.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(updatePurchaseOrder.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    // delete purchase order
    builder.addCase(deletePurchaseOrder.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(deletePurchaseOrder.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(deletePurchaseOrder.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
  },
});

export default purchaseOrderSlice.reducer;
