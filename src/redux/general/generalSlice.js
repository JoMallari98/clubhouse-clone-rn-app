import { createSlice } from '@reduxjs/toolkit';
import { triggerSignInSucceded } from '../signIn/signInSagas';
import { triggerSignUpSucceded } from '../signUp/signUpSagas';

const initialState = {
  appStatus: '',
  user: null,
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setAppStatus: (state, action) => {
      appStatus = action.payload;
    },
    setCurrentUser: (state, action) => {
      user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(triggerSignInSucceded, (state, action) => {
      return {
        ...state,
        user: action.payload?.user,
      };
    }),
      builder.addCase(triggerSignUpSucceded, (state, action) => {
        return {
          ...state,
          user: action.payload?.user,
        };
      });
  },
});

export const { setAppStatus } = generalSlice.actions;

export default generalSlice.reducer;
