import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {headersBuilder, createBasicReducer, initialState} from '../../helper';

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
    async (data = null, thunkAPI) => {
      try {
        const response = await Axios.get(`${BASE_URL}/supplier`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// get supplier by id
export const getSupplierById = createAsyncThunk(
    types.GET_SUPPLIER_BY_ID,
    async (data, thunkAPI) => {
      try {
        const response = await Axios.get(`${BASE_URL}/supplier/${id}`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);


// create supplier
export const createSupplier = createAsyncThunk(
    types.CREATE_SUPPLIER,
    async (data, thunkAPI) => {
      try {
        const response = await Axios.post(`${BASE_URL}/supplier`, data, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// update supplier
export const updateSupplier = createAsyncThunk(
    types.UPDATE_SUPPLIER,
    async (data, thunkAPI) => {
      try {
        const response = await Axios.put(
            `${BASE_URL}/supplier${data.id}`, data, {
              ...headersBuilder(),
            });
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// delete supplier
export const deleteSupplier = createAsyncThunk(
    types.DELETE_SUPPLIER,
    async (data, thunkAPI) => {
      try {
        const response = await Axios.delete(`${BASE_URL}/supplier/${data.id}`, {
          ...headersBuilder()});
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// slicer
const supplierSlice = createSlice({
  name: 'supplier',
  initialState: {...initialState},
  extraReducers: (builder) => {
    //   get supplier
    builder.addCase(getSupplier.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(getSupplier.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(getSupplier.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    //   get supplier by id
    builder.addCase(getSupplierById.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(getSupplierById.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(getSupplierById.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    //   create supplier
    builder.addCase(createSupplier.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(createSupplier.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(createSupplier.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    //   update supplier
    builder.addCase(updateSupplier.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(updateSupplier.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(updateSupplier.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
    //   delete supplier
    builder.addCase(deleteSupplier.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(deleteSupplier.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(deleteSupplier.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
  },
});

export default supplierSlice.reducer;
