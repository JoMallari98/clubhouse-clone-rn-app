import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatRoomTypes: [
    { id: 1, name: 'Just Chat', isSelected: false },
    { id: 2, name: 'Sports', isSelected: false },
    { id: 3, name: '1 on 1 advice', isSelected: true },
    { id: 4, name: 'Tourism', isSelected: false },
    { id: 5, name: 'Random', isSelected: false },
  ],
  commuteTypes: [
    { id: 1, name: '15 min', isSelected: true },
    { id: 2, name: '20 min', isSelected: false },
    { id: 3, name: '40 min', isSelected: false },
    { id: 4, name: '1 hr+', isSelected: false },
  ],
  poolSizes: [
    { id: 1, name: '4', isSelected: false },
    { id: 2, name: '6', isSelected: false },
    { id: 3, name: '8', isSelected: false },
    { id: 4, name: '10', isSelected: false },
  ],
  isValid: false,
};
export const startALobbySlice = createSlice({
  name: 'startALobby',
  initialState,
  reducers: {
    selectChatRoomType: (state, action) => {
      let newList = [];
      for (let index in state.chatRoomTypes) {
        if (state.chatRoomTypes[index].id == action.payload) {
          newList.push({
            id: state.chatRoomTypes[index].id,
            name: state.chatRoomTypes[index].name,
            isSelected: !state.chatRoomTypes[index].isSelected,
          });
        } else {
          newList.push({
            id: state.chatRoomTypes[index].id,
            name: state.chatRoomTypes[index].name,
            isSelected: false,
          });
        }
      }
      return {
        ...state,
        isValid: isAllSettingsSelected(newList, state.commuteTypes, state.poolSizes),
        chatRoomTypes: newList,
      };
    },
    selectCommuteTypes: (state, action) => {
      let commuteTypesNewList = [];
      for (let index in state.commuteTypes) {
        if (state.commuteTypes[index].id == action.payload) {
          commuteTypesNewList.push({
            id: state.commuteTypes[index].id,
            name: state.commuteTypes[index].name,
            isSelected: !state.commuteTypes[index].isSelected,
          });
        } else {
          commuteTypesNewList.push({
            id: state.commuteTypes[index].id,
            name: state.commuteTypes[index].name,
            isSelected: false,
          });
        }
      }
      return {
        ...state,
        isValid: isAllSettingsSelected(state.chatRoomTypes, commuteTypesNewList, state.poolSizes),
        commuteTypes: commuteTypesNewList,
      };
    },
    selectPoolSizes: (state, action) => {
      let poolSizesNewList = [];
      for (let index in state.poolSizes) {
        if (state.poolSizes[index].id == action.payload) {
          poolSizesNewList.push({
            id: state.poolSizes[index].id,
            name: state.poolSizes[index].name,
            isSelected: !state.poolSizes[index].isSelected,
          });
        } else {
          poolSizesNewList.push({
            id: state.poolSizes[index].id,
            name: state.poolSizes[index].name,
            isSelected: false,
          });
        }
      }
      return {
        ...state,
        isValid: isAllSettingsSelected(state.chatRoomTypes, state.commuteTypes, poolSizesNewList),
        poolSizes: poolSizesNewList,
      };
    },
  },
});

function isAllSettingsSelected(chatRoomTypes, commuteTypes, poolSizes) {
  const chatRoomSelctedCount = chatRoomTypes.find((el) => el.isSelected === true);
  const commuteTypesSelctedCount = commuteTypes.find((el) => el.isSelected === true);
  const poolSizesSelctedCount = poolSizes.find((el) => el.isSelected === true);
  if (chatRoomSelctedCount && commuteTypesSelctedCount && poolSizesSelctedCount) {
    return true;
  }
  return false;
}

export const { selectChatRoomType, selectCommuteTypes, selectPoolSizes } = startALobbySlice.actions;

export default startALobbySlice.reducer;
