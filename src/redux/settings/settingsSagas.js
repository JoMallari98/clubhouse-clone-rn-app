import { createAction } from '@reduxjs/toolkit';
import { put, delay, call, eventChannel } from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

/*********************************************************
 * GET GLOBAL SETTINGS - START
 *********************************************************/

export const triggerGetGlobalSettingsSucceded = createAction(
  'settings/triggerGetGlobalSettingsSucceded'
);

export const triggerGetGlobalSettingsFailed = createAction(
  'settings/triggerGetGlobalSettingsFailed'
);

function getGlobalSettings() {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('globalSettings')
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot?.docs[0]) {
          resolve(documentSnapshot?.docs[0].data());
        }
      });
  });
}

export function* onTriggerGetGlobalSettingsSaga(action) {
  try {
    const globalSettings = yield call(getGlobalSettings, null);
    if (globalSettings) {
      yield put(triggerGetGlobalSettingsSucceded(globalSettings));
      return;
    }
    yield put(triggerGetGlobalSettingsFailed('Global settings not found'));
  } catch (error) {
    console.log(error);
    yield put(triggerGetGlobalSettingsFailed('Global settings not found'));
  }
}

/*********************************************************
 * GET GLOBAL SETTINGS - END
 *********************************************************/

/*********************************************************
 * GET USER CHAT SETTINGS - START
 *********************************************************/

export const triggerGetUserChatSettingsSucceeded = createAction(
  'settings/triggerGetUserChatSettingsSucceeded'
);

export const triggerGetUserChatSettingsFailed = createAction(
  'settings/triggerGetUserChatSettingsFailed'
);

function getUserChatSettings(uid) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(
        (documentSnapshot) => {
          resolve(documentSnapshot.data());
        },
        (error) => {
          console.log(error);
          reject(new Error('User chat settings not found.'));
        }
      );
  });
}

export function* onTriggerGetUserChatSettingsSaga(action) {
  try {
    const userChatSettings = yield call(getUserChatSettings, action.payload);
    if (userChatSettings) {
      yield put(triggerGetUserChatSettingsSucceeded(userChatSettings));
      return;
    }
    yield put(triggerGetUserChatSettingsFailed('User chat settings not found'));
  } catch (error) {
    console.log(error);
    yield put(triggerGetUserChatSettingsFailed('User chat settings not found'));
  }
}

/*********************************************************
 * GET USER CHAT SETTINGS - END
 *********************************************************/

/*********************************************************
 * UPDATE USER CHAT SETTINGS - START
 *********************************************************/

export const triggerUpdateUserChatSettingsSucceeded = createAction(
  'settings/triggerUpdateUserChatSettingsSucceeded'
);

export const triggerUpdateUserChatSettingsFailed = createAction(
  'settings/triggerUpdateUserChatSettingsFailed'
);

function updateUserChatSettings({ uid, chatSettings }) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then((query) => {
        const receivedData = query.data();
        firestore()
          .collection('users')
          .doc(uid)
          .update({ ...receivedData, defaultChatRoomSettings: chatSettings })
          .then(() => {
            resolve(chatSettings);
          });
      });
  });
}

export function* onTriggerUpdateUserChatSettingsSaga(action) {
  try {
    const { uid, chatSettings } = action?.payload;
    const result = yield call(updateUserChatSettings, {
      uid: uid,
      chatSettings: chatSettings,
    });
    if (result) {
      yield put(triggerUpdateUserChatSettingsSucceeded(result));
      return;
    }
    yield put(triggerUpdateUserChatSettingsFailed('User chat settings not updated'));
  } catch (error) {
    console.log(error);
    yield put(triggerUpdateUserChatSettingsFailed('User chat settings not updated'));
  }
}

/*********************************************************
 * UPDATE USER CHAT SETTINGS - END
 *********************************************************/
