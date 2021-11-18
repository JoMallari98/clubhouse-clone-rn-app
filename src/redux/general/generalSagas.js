import { createAction } from '@reduxjs/toolkit';
import { put, delay, call } from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import { StorageUtils } from '../../utils/storage';

export const triggerGetCurrentUserSucceded = createAction('general/triggerGetCurrentUserSucceded');

export const triggerGetCurrentUserFailed = createAction('general/triggerGetCurrentUserFailed');

function currentUser() {
  try {
    return auth().currentUser();
  } catch (error) {
    throw error;
  }
}

export function* onTriggerGetCurrentUserSaga(action) {
  try {
    const user = yield call(StorageUtils.getObjectValue, '@user');
    if (!user) {
      yield put(triggerGetCurrentUserFailed('User not found'));
    } else {
      const currentUser = auth().currentUser;
      if (currentUser == null) {
        yield put(triggerGetCurrentUserFailed('User not found'));
      }
      yield put(triggerGetCurrentUserSucceded(user));
    }
  } catch (error) {
    console.log(error);
    yield put(triggerGetCurrentUserFailed('User not found'));
  }
}
