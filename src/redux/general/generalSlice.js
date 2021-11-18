import { createSlice } from '@reduxjs/toolkit';
import { triggerSignInSucceded } from '../signIn/signInSagas';
import { triggerSignUpSucceded } from '../signUp/signUpSagas';

const initialState = {
  appStatus: '',
  user: null,
  isLoading: false,
  error: null,
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setAppStatus: (state, action) => {
      state.appStatus = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    triggerGetCurrentUser: (state) => {
      state.isLoading = true;
      state.error = null;
      state.user = null;
    },
    triggerGetCurrentUserSucceded: (state, action) => {
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    },
    triggerGetCurrentUserFailed: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
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

export const { setAppStatus, setCurrentUser, triggerGetCurrentUser } = generalSlice.actions;

export default generalSlice.reducer;
