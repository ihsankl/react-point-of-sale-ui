/* eslint-disable camelcase */
import {createSlice} from '@reduxjs/toolkit';

const cashierSlice = createSlice({
  name: 'cashier',
  initialState: {
    data: [],
  },
  reducers: {
    addItems: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    // add up qty and sub_total
    upItem: (state, action) => {
      const {product_id, qty} = action.payload;
      const item = state.data.find((item) => item.product_id === product_id);
      item.qty += qty;
      item.sub_total = item.qty * item.unit_price;
    },
    downItem: (state, action) => {
      const {product_id, qty} = action.payload;
      const item = state.data.find((item) => item.product_id === product_id);
      item.qty -= qty;
      item.sub_total = item.qty * item.unit_price;
    },
    editItem: (state, action) => {
      // find which item to edit
      const {product_id, qty, sub_total, unit_price} = action.payload;
      const item = state.data.find((item) => item.product_id === product_id);
      item.qty = qty;
      item.sub_total = sub_total;
      item.unit_price = unit_price;
    },
    removeItem: (state, action) => {
      // example of action.payload
      // const items = [
      //     {
      //         "qty":2,
      //         "unit_price": 5000,
      //         "sub_total": 10000,
      //         "product_id": 104
      //     },
      //     {
      //         "qty": 1,
      //         "unit_price": 6000,
      //         "sub_total": 18000,
      //         "product_id": 105
      //     },
      //      {
      //         "qty":30,
      //         "unit_price": 5000,
      //         "sub_total": 10000,
      //         "product_id": 102
      //     }
      // ];
      // remove items with same id from action.payload
      const index = action.payload;
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    },
    clearItems: (state) => {
      state.data = [];
    },
  },
});

export const {
  addItems,
  removeItem,
  upItem,
  downItem,
  clearItems,
} = cashierSlice.actions;
export default cashierSlice.reducer;

