import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoadingGetFriends: false,
  getFriendsError: null,
  getFriendsSuccess: null,
  friends: [],
  receivedFriendRequests: [],
  sentFriendRequests: [],
  suggestedFriends: [],
  allUsers: [],
  isLoadingSendFriendRequest: false,
  sendFriendRequestError: null,
  sendFriendRequestSuccess: null,
  isLoadingCancelFriendRequest: false,
  cancelFriendRequestError: null,
  cancelFriendRequestSuccess: null,
  isLoadingAcceptReceivedFriendRequest: false,
  acceptReceivedFriendRequestError: null,
  acceptReceivedFriendRequestSuccess: null,
  isLoadingRejectReceivedFriendRequest: false,
  rejectReceivedFriendRequestError: null,
  rejectReceivedFriendRequestSuccess: null,
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    triggerGetFriends: (state) => {
      state.isLoadingGetFriends = true;
      state.getFriendsError = null;
      state.getFriendsSuccess = null;
      (sendFriendRequestError = null),
        (sendFriendRequestSuccess = null),
        (cancelFriendRequestError = null),
        (cancelFriendRequestSuccess = null),
        (acceptReceivedFriendRequestError = null),
        (acceptReceivedFriendRequestSuccess = null),
        (rejectReceivedFriendRequestError = null),
        (rejectReceivedFriendRequestSuccess = null);
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
      state.allUsers = users;
      state.getFriendsSuccess = 'Friends are loaded successfully';
    },
    triggerGetFriendsFailed: (state, action) => {
      state.isLoadingGetFriends = false;
    },
    triggerSendFriendRequest: (state) => {
      state.isLoadingSendFriendRequest = true;
      state.sendFriendRequestError = null;
      state.sendFriendRequestSuccess = null;
    },
    triggerSendFriendRequestSucceded: (state, action) => {
      state.isLoadingSendFriendRequest = false;
      state.sendFriendRequestSuccess = 'Friend request is sent successfully';
    },
    triggerSendFriendRequestFailed: (state, action) => {
      state.isLoadingSendFriendRequest = false;
      state.sendFriendRequestError = action.payload;
    },

    triggerCancelFriendRequest: (state) => {
      state.isLoadingCancelFriendRequest = true;
      state.cancelFriendRequestError = null;
      state.cancelFriendRequestSuccess = null;
    },
    triggerCancelFriendRequestSucceded: (state, action) => {
      state.isLoadingCancelFriendRequest = false;
      state.cancelFriendRequestSuccess = 'Friend request is cancelled successfully';
    },
    triggerCancelFriendRequestFailed: (state, action) => {
      state.isLoadingCancelFriendRequest = false;
      state.isLoadingCancelFriendRequest = action.payload;
    },

    triggerAcceptReceivedFriendRequest: (state) => {
      state.isLoadingAcceptReceivedFriendRequest = true;
      state.acceptReceivedFriendRequestError = null;
      state.acceptReceivedFriendRequestSuccess = null;
    },
    triggerAcceptReceivedFriendRequestSucceded: (state, action) => {
      state.isLoadingAcceptReceivedFriendRequest = false;
      state.acceptReceivedFriendRequestSuccess = 'Accept received friend request';
    },
    triggerAcceptReceivedFriendRequestFailed: (state, action) => {
      state.isLoadingAcceptReceivedFriendRequest = false;
      state.acceptReceivedFriendRequestError = action.payload;
    },

    triggerRejectReceivedFriendRequest: (state) => {
      state.isLoadingRejectReceivedFriendRequest = true;
      state.rejectReceivedFriendRequestError = null;
      state.rejectReceivedFriendRequestSuccess = null;
    },
    triggerRejectReceivedFriendRequestSucceded: (state, action) => {
      state.isLoadingRejectReceivedFriendRequest = false;
      state.rejectReceivedFriendRequestSuccess = 'Friend request rejected successfully';
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
