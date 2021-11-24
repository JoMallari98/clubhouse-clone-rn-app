import { createAction } from '@reduxjs/toolkit';
import { put, delay, call } from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import { StorageUtils } from '../../utils/storage';
import firestore from '@react-native-firebase/firestore';

export const triggerSignInSucceded = createAction('signIn/triggerSignInSucceded');

export const triggerSignInFailed = createAction('signIn/triggerSignInFailed');

function signIn(payload) {
  try {
    return auth().signInWithEmailAndPassword(payload.email, payload.password);
  } catch (error) {
    throw error;
  }
}

function getUser(uid) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(
        (documentSnapshot) => {
          resolve(documentSnapshot.data());
        },
        (error) => {
          reject(new Error('User details not found.'));
        }
      );
  });
}

export function* onTriggerSignInSaga(action) {
  try {
    const signInResult = yield call(signIn, action.payload);
    const profileUser = yield call(getUser, signInResult?.user?.uid);
    StorageUtils.setObjectValue('@user', signInResult?.user);
    StorageUtils.setObjectValue('@profileUser', profileUser);
    yield put(triggerSignInSucceded({ signInResult, profileUser }));
  } catch (error) {
    console.log(error);
    let message = 'User sign in is not success. Please try again';
    if (error.code === 'auth/email-already-in-use') {
      message = 'That email address is already in use!';
    }

    if (error.code === 'auth/invalid-email') {
      message = 'That email address is invalid!';
    }
    yield put(triggerSignInFailed(message));
  }
}
