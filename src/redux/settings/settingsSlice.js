import { createSlice } from '@reduxjs/toolkit';
import { exp } from 'react-native/Libraries/Animated/Easing';

const initialState = {
  isLoading: false,
  error: null,
  chatRoomTypes: [
    // { id: 1, name: 'Just Chat', isSelected: false },
    // { id: 2, name: 'Sports', isSelected: false },
    // { id: 3, name: '1 on 1 advice', isSelected: true },
    // { id: 4, name: 'Tourism', isSelected: false },
    // { id: 5, name: 'Random', isSelected: false },
  ],
  commuteTypes: [
    // { id: 1, name: '15 min', isSelected: true },
    // { id: 2, name: '20 min', isSelected: false },
    // { id: 3, name: '40 min', isSelected: false },
    // { id: 4, name: '1 hr+', isSelected: false },
  ],
  poolSizes: [
    // { id: 1, name: '4', isSelected: false },
    // { id: 2, name: '6', isSelected: false },
    // { id: 3, name: '8', isSelected: false },
    // { id: 4, name: '10', isSelected: false },
  ],
  defaultChatRoomSettings: null,
  isValid: false,
};
export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    selectChatRoomType: (state, action) => {
      state.defaultChatRoomSettings.selectedChatRoomType = action.payload;
      state.isValid = isAllSettingsSelected(state);
    },
    selectCommuteTypes: (state, action) => {
      state.defaultChatRoomSettings.selectedEstCommuteType = action.payload;
      state.isValid = isAllSettingsSelected(state);
    },
    selectPoolSizes: (state, action) => {
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
