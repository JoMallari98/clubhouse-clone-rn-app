import { createAction } from '@reduxjs/toolkit';
import { put, delay, call } from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';

export const triggerSignInSucceded = createAction('signIn/triggerSignInSucceded');

export const triggerSignInFailed = createAction('signIn/triggerSignInFailed');

function signIn(payload) {
  try {
    return auth().signInWithEmailAndPassword(payload.email, payload.password);
  } catch (error) {
    throw error;
  }
}

export function* onTriggerSignInSaga(action) {
  try {
    const result = yield call(signIn, action.payload);
    yield put(triggerSignInSucceded(result));
  } catch (error) {
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
