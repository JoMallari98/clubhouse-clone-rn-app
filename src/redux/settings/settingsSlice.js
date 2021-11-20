import { createSlice } from '@reduxjs/toolkit';
import { exp } from 'react-native/Libraries/Animated/Easing';

const initialState = {
  isLoading: false,
  error: null,
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
      console.log('settings : --> ', state.defaultChatRoomSettings);
    },
    selectCommuteTypes: (state, action) => {
      if (!state.defaultChatRoomSettings) state.defaultChatRoomSettings = {};
      state.defaultChatRoomSettings.selectedEstCommuteType = action.payload;
      state.isValid = isAllSettingsSelected(state);
      console.log('settings : --> ', state.defaultChatRoomSettings);
    },
    selectPoolSizes: (state, action) => {
      if (!state.defaultChatRoomSettings) state.defaultChatRoomSettings = {};
      state.defaultChatRoomSettings.selectedPreferredPoolSize = action.payload;
      state.isValid = isAllSettingsSelected(state);
      console.log('settings : --> ', state.defaultChatRoomSettings);
    },
    triggerGetGlobalSettings: (state, action) => {
      state.isLoading = true;
    },
    triggerGetGlobalSettingsFailed: (state, action) => {
      state.isLoading = false;
    },
    triggerGetGlobalSettingsSucceded: (state, action) => {
      console.log('data in --> 0');
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
      state.isLoading = true;
    },
    triggerGetUserChatSettingsFailed: (state, action) => {
      state.isLoading = false;
    },
    triggerGetUserChatSettingsSucceeded: (state, action) => {
      console.log('data in --> 1');
      state.isLoading = false;
      state.defaultChatRoomSettings = action.payload?.defaultChatRoomSettings;
    },
    triggerUpdateUserChatSettings: (state, action) => {
      state.isLoading = true;
    },
    triggerUpdateUserChatSettingsFailed: (state, action) => {
      state.isLoading = false;
    },
    triggerUpdateUserChatSettingsSucceeded: (state, action) => {
      console.log('data in --> 2');
      state.isLoading = false;
      state.defaultChatRoomSettings = action.payload;
      state.isValid = isAllSettingsSelected(state);
      console.log(' triggerUpdateUserChatSettingsSucceeded ', action.payload);
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
