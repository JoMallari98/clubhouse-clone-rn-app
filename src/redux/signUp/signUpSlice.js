import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  result: null,
};

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    triggerSignUpSaga: (state) => {
      state.isLoading = true;
      state.error = null;
      state.result = null;
    },
    triggerSignUpSucceded: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.result = action.payload?.signUpResult;
    },
    triggerSignUpFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.result = null;
    },
  },
});

export const { triggerSignUpSaga } = signUpSlice.actions;

export default signUpSlice.reducer;
