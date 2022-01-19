import {createSlice} from '@reduxjs/toolkit';

const confirmDialogSlice = createSlice({
  name: 'confirmDialog',
  initialState: {
    isOpen: false,
    title: '',
    message: '',
  },
  reducers: {
    openConfirmDialog: (state, action) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
    },
    closeConfirmDialog: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  openConfirmDialog,
  closeConfirmDialog,
} = confirmDialogSlice.actions;
export default confirmDialogSlice.reducer;
