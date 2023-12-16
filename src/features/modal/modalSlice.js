import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  alertType: 'success',
  alertMessage: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openGenModal: (state, action) => {
      state.isOpen = true;
      state.alertType = action.payload.alertType;
      state.alertMessage = action.payload.alertMessage;
    },
    closeGenModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openGenModal, closeGenModal } = modalSlice.actions;
export default modalSlice.reducer;
