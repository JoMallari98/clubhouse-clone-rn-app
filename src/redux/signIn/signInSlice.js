import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  result: null,
};
export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    triggerSignInSaga: (state) => {
      state.isLoading = true;
      state.error = null;
      state.result = null;
    },
    triggerSignInSucceded: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.result = action.payload;
    },
    triggerSignInFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.result = null;
    },
  },
});

export const { triggerSignInSaga } = signInSlice.actions;
// export const selectCount = (state) => state.counter.value;

export default signInSlice.reducer;
