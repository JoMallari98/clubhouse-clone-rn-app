import { createSlice } from '@reduxjs/toolkit';
import { triggerSignInSucceded, triggerSignOutSucceded } from '../signIn/signInSagas';
import { triggerSignUpSucceded } from '../signUp/signUpSagas';

const initialState = {
  appStatus: '',
  user: null,
  profileUser: null,
  isLoading: false,
  error: null,
  isUploadingProfilePicture: false,
  profileImageUrl: null,
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
      state.isLoading = false;
      state.user = action.payload?.user;
      state.profileUser = action.payload?.profileUser;
      // return {
      //   ...state,
      //   isLoading: false,
      //   user: action.payload?.user,
      //   profileUser: action.payload?.profileUser,
      // };
    },
    triggerGetCurrentUserFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      // return {
      //   ...state,
      //   isLoading: false,
      //   error: action.payload,
      // };
    },
    triggerUploadProfilePicture: (state) => {
      state.isUploadingProfilePicture = true;
      state.error = null;
      //state.profileImageUrl=null;
    },
    triggerUploadProfilePictureSucceded: (state, action) => {
      return {
        ...state,
        isUploadingProfilePicture: false,
        profileUser: {
          ...state.profileUser,
          imageUrl: action.payload,
        },
      };
    },
    triggerUploadProfilePictureFailed: (state, action) => {
      return {
        ...state,
        isUploadingProfilePicture: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(triggerSignInSucceded, (state, action) => {
      return {
        ...state,
        user: action.payload?.signInResult.user,
        profileUser: action.payload?.profileUser,
      };
    }),
      builder.addCase(triggerSignUpSucceded, (state, action) => {
        return {
          ...state,
          user: action.payload?.signUpResult.user,
          profileUser: action.payload?.profileUser,
        };
      }),
      builder.addCase(triggerSignOutSucceded, (state, action) => {
        return {
          ...state,
          user: null,
          profileUser: null,
        };
      });
  },
});

export const {
  setAppStatus,
  setCurrentUser,
  triggerGetCurrentUser,
  triggerUploadProfilePicture,
  //triggerResetAuth,
} = generalSlice.actions;

export default generalSlice.reducer;
