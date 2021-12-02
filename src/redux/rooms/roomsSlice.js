import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoadingFindRoom: false,
  room: null,
  roomId: null,
  roomSize: null,
  findRoomError: null,
  isLoadingUpdateRoomStatus: false,
  updateRoomStatusError: null,
};
export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    triggerFindRoom: (state, action) => {
      state.isLoadingFindRoom = true;
      state.room = null;
      state.roomId = null;
      state.roomSize = null;
      state.findRoomError = null;
    },
    triggerFindRoomSucceded: (state, action) => {
      state.isLoadingFindRoom = false;
      state.room = action.payload?.room;
      state.roomId = action.payload?.roomId;
      state.roomSize = action.payload?.roomSize;
    },
    triggerFindRoomFailed: (state, action) => {
      state.isLoadingFindRoom = false;
      state.findRoomError = action.payload;
    },

    triggerUpdateRoomStatus: (state, action) => {
      state.isLoadingUpdateRoomStatus = true;
      state.updateRoomStatusError = null;
    },
    triggerUpdateRoomStatusSucceded: (state, action) => {
      state.isLoadingUpdateRoomStatus = false;
    },
    triggerUpdateRoomStatusFailed: (state, action) => {
      state.isLoadingUpdateRoomStatus = false;
      state.updateRoomStatusError = action.payload;
    },
  },
});

export const { triggerFindRoom, triggerUpdateRoomStatus } = roomsSlice.actions;

export default roomsSlice.reducer;
