import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  result: null,
  isSignOutLoading: false,
  signOutError: null,
  signOutSuccess: null,
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
      state.result = action.payload?.signInResult;
    },
    triggerSignInFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.result = null;
    },
    triggerSignOutSaga: (state) => {
      state.isSignOutLoading = true;
      state.signOutError = null;
      state.signOutSuccess = null;
    },
    triggerSignOutSucceded: (state, action) => {
      console.log('sign out success');
      state.isSignOutLoading = false;
      state.signOutSuccess = 'Sign out success';
      state.signOutError = null;
    },
    triggerSignOutFailed: (state, action) => {
      console.log('sign out failed');
      state.isSignOutLoading = false;
      state.signOutError = action.payload;
      state.signOutSuccess = null;
    },
  },
});

export const { triggerSignInSaga, triggerSignOutSaga } = signInSlice.actions;
// export const selectCount = (state) => state.counter.value;

export default signInSlice.reducer;
