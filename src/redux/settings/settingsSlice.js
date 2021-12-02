import { createSlice } from '@reduxjs/toolkit';
import { exp } from 'react-native/Libraries/Animated/Easing';

const initialState = {
  isLoading: false,
  isLoadingGetUserChatSettings: false,
  isLoadingUpdateUserChatSettings: false,
  updateUserChatSettingsError: null,
  error: null,
  getUserChatSettingsError: null,
  chatRoomTypes: [],
  commuteTypes: [],
  poolSizes: [],
  defaultChatRoomSettings: null,
  isValid: false,
};
export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    selectChatRoomType: (state, action) => {
      if (!state.defaultChatRoomSettings) state.defaultChatRoomSettings = {};
      state.defaultChatRoomSettings.selectedChatRoomType = action.payload;
      state.isValid = isAllSettingsSelected(state);
    },
    selectCommuteTypes: (state, action) => {
      if (!state.defaultChatRoomSettings) state.defaultChatRoomSettings = {};
      state.defaultChatRoomSettings.selectedEstCommuteType = action.payload;
      state.isValid = isAllSettingsSelected(state);
    },
    selectPoolSizes: (state, action) => {
      if (!state.defaultChatRoomSettings) state.defaultChatRoomSettings = {};
      state.defaultChatRoomSettings.selectedPreferredPoolSize = action.payload;
      state.isValid = isAllSettingsSelected(state);
    },
    triggerGetGlobalSettings: (state, action) => {
      state.isLoading = true;
    },
    triggerGetGlobalSettingsFailed: (state, action) => {
      state.isLoading = false;
    },
    triggerGetGlobalSettingsSucceded: (state, action) => {
      state.isLoading = false;

      const modifiedChatRoomTypes = [];
      const tempChatRoomTypes = [];
      action.payload.chatRoomTypes?.forEach((element) => {
        if (element?.isWeeklyAdChat && element.isActive) {
          modifiedChatRoomTypes.push(element);
        }
        if (!element?.isWeeklyAdChat && element.isActive) {
          tempChatRoomTypes.push(element);
        }
      });
      state.chatRoomTypes = [...modifiedChatRoomTypes, ...tempChatRoomTypes];

      state.commuteTypes = action.payload.estCommuteTypes.filter(function (el) {
        return el.isActive == true;
      });
      state.poolSizes = action.payload.preferredPoolSizes.filter(function (el) {
        return el.isActive == true;
      });
    },
    triggerGetUserChatSettings: (state, action) => {
      state.isLoadingGetUserChatSettings = true;
    },
    triggerGetUserChatSettingsFailed: (state, action) => {
      state.isLoadingGetUserChatSettings = false;
    },
    triggerGetUserChatSettingsSucceeded: (state, action) => {
      state.isLoadingGetUserChatSettings = false;
      state.defaultChatRoomSettings = action.payload?.defaultChatRoomSettings;
    },
    triggerUpdateUserChatSettings: (state, action) => {
      state.isLoadingUpdateUserChatSettings = true;
      state.updateUserChatSettingsError = null;
    },
    triggerUpdateUserChatSettingsFailed: (state, action) => {
      state.isLoadingUpdateUserChatSettings = false;
      state.updateUserChatSettingsError = action.payload;
    },
    triggerUpdateUserChatSettingsSucceeded: (state, action) => {
      state.isLoadingUpdateUserChatSettings = false;
      state.defaultChatRoomSettings = action.payload;
      state.isValid = isAllSettingsSelected(state);
    },
  },
});

function isAllSettingsSelected(state) {
  return state.defaultChatRoomSettings.selectedChatRoomType &&
    state.defaultChatRoomSettings.selectedPreferredPoolSize &&
    state.defaultChatRoomSettings.selectedEstCommuteType
    ? true
    : false;
}

export const {
  selectChatRoomType,
  selectCommuteTypes,
  selectPoolSizes,
  triggerGetGlobalSettings,
  triggerGetUserChatSettings,
  triggerUpdateUserChatSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
