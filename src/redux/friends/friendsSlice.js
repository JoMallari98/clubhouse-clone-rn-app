import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  friends: [],
  friendRequests: [],
  error: null,
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    triggerGetFriends: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    triggerGetFriendsSucceded: (state, action) => {
      const { friends, users } = action.payload;
      console.log(action.payload);

      const newFriendsList = [];
      const newFriendRequestList = [];
      friends.forEach((friend, index) => {
        console.log(friend);

        const userData = users.filter((user) => {
          return friend?.id == user?.data()?.id;
        });
        if (friend.status == 'accepted') {
          newFriendsList.push(userData[0]?.data());
        } else if (friend.status == 'pending') {
          newFriendRequestList.push(userData[0]?.data());
        }
      });
      state.isLoading = false;
      state.friends = newFriendsList;
      state.friendRequests = newFriendRequestList;

      console.log('data data  : ', state.friends, state.friendRequests);
    },
    triggerGetFriendsFailed: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { triggerGetFriends } = friendsSlice.actions;

export default friendsSlice.reducer;
