import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoadingFindRoom: false,
  room: null,
  roomId: null,
  roomSize: null,
  findRoomError: null,
  isLoadingUpdateRoomStatus: false,
  updateRoomStatusError: null,
  isLoadingUpdateMicStatus: false,
  updateMicStatusError: null,
  isLoadingLeaveRoom: false,
  leaveRoomError: null,
  leaveRoomSuccess: null,
  isLoadingGetPreviousChatRooms: false,
  getPreviousChatRoomsError: null,
  previousChatRooms: [],
  isLoadingRejoinRoom: false,
  rejoinRoomError: null,
  rejoinRoomData: null,
};
export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    triggerResetRoom: (state, action) => {
      state.isLoadingFindRoom = false;
      state.room = null;
      state.roomId = null;
      state.roomSize = null;
      state.findRoomError = null;
      state.isLoadingUpdateRoomStatus = false;
      state.updateRoomStatusError = null;
      state.isLoadingUpdateMicStatus = false;
      state.updateMicStatusError = null;
      state.isLoadingLeaveRoom = false;
      state.leaveRoomError = null;
      state.leaveRoomSuccess = null;
      isLoadingGetPreviousChatRooms = false;
      getPreviousChatRoomsError = null;
      previousChatRooms = [];
      isLoadingRejoinRoom = false;
      rejoinRoomError = null;
      rejoinRoomData = null;
    },
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

    triggerUpdateMicStatus: (state, action) => {
      state.isLoadingUpdateMicStatus = true;
      state.updateMicStatusError = null;
    },
    triggerUpdateMicStatusSucceded: (state, action) => {
      state.isLoadingUpdateMicStatus = false;
    },
    triggerUpdateMicStatusFailed: (state, action) => {
      state.isLoadingUpdateMicStatus = false;
      state.updateMicStatusError = action.payload;
    },

    triggerLeaveRoom: (state, action) => {
      state.isLoadingLeaveRoom = true;
      state.leaveRoomError = null;
      state.leaveRoomSuccess = null;
    },
    triggerLeaveRoomSucceded: (state, action) => {
      state.isLoadingLeaveRoom = false;
      state.leaveRoomSuccess = 'leave room success';
    },
    triggerLeaveRoomFailed: (state, action) => {
      state.isLoadingLeaveRoom = false;
      state.leaveRoomError = action.payload;
    },

    triggerGetPreviousChatRooms: (state, action) => {
      state.isLoadingGetPreviousChatRooms = true;
      state.getPreviousChatRoomsError = null;
      state.previousChatRooms = [];
    },
    triggerGetPreviousChatRoomsSucceded: (state, action) => {
      state.isLoadingGetPreviousChatRooms = false;
      state.previousChatRooms = action.payload;
    },
    triggerGetPreviousChatRoomsFailed: (state, action) => {
      state.isLoadingGetPreviousChatRooms = false;
      state.getPreviousChatRoomsError = action.payload;
    },

    triggerRejoinRoom: (state, action) => {
      state.isLoadingRejoinRoom = true;
      state.rejoinRoomError = null;
      state.rejoinRoomSuccess = null;
    },
    triggerRejoinRoomSucceded: (state, action) => {
      state.isLoadingRejoinRoom = false;
      state.rejoinRoomData = action.payload?.room;

      state.room = action.payload?.room;
      state.roomId = action.payload?.roomId;
      state.roomSize = action.payload?.roomSize;
    },
    triggerRejoinRoomFailed: (state, action) => {
      state.isLoadingRejoinRoom = false;
      state.rejoinRoomError = action.payload;
    },
  },
});

export const {
  triggerFindRoom,
  triggerUpdateRoomStatus,
  triggerUpdateMicStatus,
  triggerLeaveRoom,
  triggerResetRoom,
  triggerGetPreviousChatRooms,
  triggerRejoinRoom,
} = roomsSlice.actions;

export default roomsSlice.reducer;
