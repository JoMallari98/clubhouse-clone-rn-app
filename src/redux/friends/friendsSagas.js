import { createAction } from '@reduxjs/toolkit';
import { put, delay, call } from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import { StorageUtils } from '../../utils/storage';
import firestore from '@react-native-firebase/firestore';

export const triggerGetFriendsSucceded = createAction('friends/triggerGetFriendsSucceded');

export const triggerGetFriendsFailed = createAction('friends/triggerGetFriendsFailed');

function getFriends(uid) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then((documentSnapshot) => {
        resolve(documentSnapshot.data());
      });
  });
}

function getUsers() {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .get()
      .then((documentSnapshot) => {
        console.log('document users : ', documentSnapshot?.docs);
        resolve(documentSnapshot.docs);
      });
  });
}

export function* onTriggerGetFriendsSaga(action) {
  try {
    const friendsResult = yield call(getFriends, action.payload);
    const usersResult = yield call(getUsers, null);
    yield put(triggerGetFriendsSucceded({ friends: friendsResult?.friends, users: usersResult }));
  } catch (error) {
    console.log(error);
    yield put(triggerGetFriendsFailed('Friend list is not loaded'));
  }
}
