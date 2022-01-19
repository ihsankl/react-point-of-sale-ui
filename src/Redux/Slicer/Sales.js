import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import {headersBuilder, initialState, createBasicReducer} from '../../helper';

const BASE_URL = process.env.REACT_APP_API_URL;

const types = {
  GET_ALL_SALES: 'getAllSales',
  GET_SALES_BY_ID: 'getSalesById',
  CREATE_SALES: 'createSales',
  UPDATE_SALES: 'updateSales',
  DELETE_SALES: 'deleteSales',
};

// get all sales
export const getAllSales = createAsyncThunk(
    types.GET_ALL_SALES,
    async (data = null, thunkAPI) => {
      try {
        const response = await Axios.get(`${BASE_URL}/sales`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// get sales by id
export const getSalesById = createAsyncThunk(
    types.GET_SALES_BY_ID,
    async (data, thunkAPI) => {
      try {
        const response = await Axios.get(`${BASE_URL}/sales/${data.id}`, {
          ...headersBuilder(),
        });
        return response.data;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// create sales
export const createSales = createAsyncThunk(
    types.CREATE_SALES,
    async (data, thunkAPI) => {
      try {
        await Axios.post(`${BASE_URL}/sales`, data, {
          ...headersBuilder(),
        });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// update sales
export const updateSales = createAsyncThunk(
    types.UPDATE_SALES,
    async (data, thunkAPI) => {
      try {
        await Axios.put(`${BASE_URL}/sales/${data.id}`, data, {
          ...headersBuilder(),
        });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

// delete sales
export const deleteSales = createAsyncThunk(
    types.DELETE_SALES,
    async (data, thunkAPI) => {
      try {
        await Axios.delete(`${BASE_URL}/sales/${data.id}`, {
          ...headersBuilder(),
        });
        return;
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    },
);

const salesSlice = createSlice({
  name: 'sales',
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
  extraReducers: (builder)=> {
    // get all sales
    builder.addCase(getAllSales.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(getAllSales.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(getAllSales.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });

    // get sales by id
    builder.addCase(getSalesById.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(getSalesById.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(getSalesById.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });

    // create sales
    builder.addCase(createSales.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(createSales.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(createSales.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });

    // update sales
    builder.addCase(updateSales.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(updateSales.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(updateSales.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });

    // delete sales
    builder.addCase(deleteSales.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING');
    });
    builder.addCase(deleteSales.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED');
    });
    builder.addCase(deleteSales.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED');
    });
  },
});

export const {clearError, clearSuccess} = salesSlice.actions;
export default salesSlice.reducer;
