import { createAction } from '@reduxjs/toolkit';
import { put, delay, call } from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import { StorageUtils } from '../../utils/storage';

export const triggerSignUpSucceded = createAction('signUp/triggerSignUpSucceded');

export const triggerSignUpFailed = createAction('signUp/triggerSignUpFailed');

function signUp(payload) {
  try {
    return auth().createUserWithEmailAndPassword(payload.email, payload.password);
  } catch (error) {
    throw error;
  }
}

export function* onTriggerSignUpSaga(action) {
  try {
    const result = yield call(signUp, action.payload);

    StorageUtils.setObjectValue('@user', result?.user);
    yield put(triggerSignUpSucceded(result));
  } catch (error) {
    let message = 'Signup is not success';
    if (error.code === 'auth/email-already-in-use') {
      message = 'That email address is already in use!';
    }
    if (error.code === 'auth/invalid-email') {
      message = 'That email address is invalid!';
    }
    yield put(triggerSignUpFailed(message));
  }
}
