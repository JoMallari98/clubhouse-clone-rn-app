import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoadingGetFriends: false,
  getFriendsError: null,
  friends: [],
  receivedFriendRequests: [],
  sentFriendRequests: [],
  suggestedFriends: [],
  isLoadingSendFriendRequest: false,
  sendFriendRequestError: null,
  isLoadingCancelFriendRequest: false,
  cancelFriendRequestError: null,
  isLoadingAcceptReceivedFriendRequest: false,
  acceptReceivedFriendRequestError: null,
  isLoadingRejectReceivedFriendRequest: false,
  rejectReceivedFriendRequestError: null,
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    triggerGetFriends: (state) => {
      state.isLoadingGetFriends = true;
      state.getFriendsError = null;
    },
    triggerGetFriendsSucceded: (state, action) => {
      const { friends, users, uid } = action.payload;
      const newFriendsList = [];
      const receivedFriendRequestList = [];
      const sentFriendRequestList = [];
      const suggestedFriendList = [];
      friends.forEach((friend, index) => {
        const userData = users.filter((user) => {
          return friend?.id == user?.data()?.id;
        });
        if (friend.status == 'accepted') {
          newFriendsList.push(userData[0]?.data());
        } else if (friend.status == 'received_requests') {
          receivedFriendRequestList.push(userData[0]?.data());
        } else if (friend.status == 'sent_requests') {
          sentFriendRequestList.push(userData[0]?.data());
        }
      });

      users.forEach((user, index) => {
        if (user?.data()?.id != uid) {
          const insideFriends = friends.filter((friend) => {
            return friend.id == user?.data()?.id;
          });

          if (insideFriends && insideFriends?.length > 0) {
            if (insideFriends[0]?.status == 'sent_requests') {
              suggestedFriendList.push({ ...user?.data(), isPendingRequest: true });
            }
          } else {
            suggestedFriendList.push(user.data());
          }
        }
      });

      state.isLoadingGetFriends = false;
      state.friends = newFriendsList;
      state.receivedFriendRequests = receivedFriendRequestList;
      state.sentFriendRequests = sentFriendRequestList;
      state.suggestedFriends = suggestedFriendList;
    },
    triggerGetFriendsFailed: (state, action) => {
      state.isLoadingGetFriends = false;
    },
    triggerSendFriendRequest: (state) => {
      state.isLoadingSendFriendRequest = true;
    },
    triggerSendFriendRequestSucceded: (state, action) => {
      state.isLoadingSendFriendRequest = false;
    },
    triggerSendFriendRequestFailed: (state, action) => {
      state.isLoadingSendFriendRequest = false;
      state.sendFriendRequestError = action.payload;
    },

    triggerCancelFriendRequest: (state) => {
      state.isLoadingCancelFriendRequest = true;
    },
    triggerCancelFriendRequestSucceded: (state, action) => {
      state.isLoadingCancelFriendRequest = false;
    },
    triggerCancelFriendRequestFailed: (state, action) => {
      state.isLoadingCancelFriendRequest = false;
      state.isLoadingCancelFriendRequest = action.payload;
    },

    triggerAcceptReceivedFriendRequest: (state) => {
      state.isLoadingAcceptReceivedFriendRequest = true;
    },
    triggerAcceptReceivedFriendRequestSucceded: (state, action) => {
      state.isLoadingAcceptReceivedFriendRequest = false;
    },
    triggerAcceptReceivedFriendRequestFailed: (state, action) => {
      state.isLoadingAcceptReceivedFriendRequest = false;
      state.acceptReceivedFriendRequestError = action.payload;
    },

    triggerRejectReceivedFriendRequest: (state) => {
      state.isLoadingRejectReceivedFriendRequest = true;
    },
    triggerRejectReceivedFriendRequestSucceded: (state, action) => {
      state.isLoadingRejectReceivedFriendRequest = false;
    },
    triggerRejectReceivedFriendRequestFailed: (state, action) => {
      state.isLoadingRejectReceivedFriendRequest = false;
      state.rejectReceivedFriendRequestError = action.payload;
    },
  },
});

export const {
  triggerGetFriends,
  triggerSendFriendRequest,
  triggerCancelFriendRequest,
  triggerAcceptReceivedFriendRequest,
  triggerRejectReceivedFriendRequest,
} = friendsSlice.actions;

export default friendsSlice.reducer;
