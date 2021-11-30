import { createAction } from '@reduxjs/toolkit';
import { put, delay, call } from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import { StorageUtils } from '../../utils/storage';
import firestore from '@react-native-firebase/firestore';

/*********************************************************
 * SIGN IN - START
 *********************************************************/

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

function storeValues({ key, value }) {
  try {
    return StorageUtils.setObjectValue(key, value);
  } catch (error) {
    throw error;
  }
}

export function* onTriggerSignInSaga(action) {
  try {
    const signInResult = yield call(signIn, action.payload);
    const profileUser = yield call(getUser, signInResult?.user?.uid);
    yield call(storeValues, { key: '@user', value: signInResult?.user });
    yield call(storeValues, { key: '@profileUser', value: profileUser });
    //StorageUtils.setObjectValue('@user', signInResult?.user);
    //StorageUtils.setObjectValue('@profileUser', profileUser);
    yield put(triggerSignInSucceded({ signInResult, profileUser }));
  } catch (error) {
    console.log(error);
    let message = 'User sign in failed. Please try again.';
    if (error.code === 'auth/email-already-in-use') {
      message = 'That email address is already in use!';
    }

    if (error.code === 'auth/invalid-email') {
      message = 'That email address is invalid!';
    }
    yield put(triggerSignInFailed(message));
  }
}

/*********************************************************
 * SIGN IN - END
 *********************************************************/

/*********************************************************
 * SIGN OUT - START
 *********************************************************/

export const triggerSignOutSucceded = createAction('signIn/triggerSignOutSucceded');

export const triggerSignOutFailed = createAction('signIn/triggerSignOutFailed');

export function* onTriggerSignOutSaga(action) {
  try {
    console.log('trigger sign out');
    StorageUtils.setObjectValue('@user', null);
    StorageUtils.setObjectValue('@profileUser', null);
    yield put(triggerSignOutSucceded({}));
  } catch (error) {
    console.log(error);
    let message = 'User sign out is not success. Please try again';
    yield put(triggerSignOutFailed(message));
  }
}

/*********************************************************
 * SIGN OUT - END
 *********************************************************/
