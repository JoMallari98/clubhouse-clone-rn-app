import { createAction } from '@reduxjs/toolkit';
import { put, delay, call } from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import { getExtention } from '../../utils';
import { StorageUtils } from '../../utils/storage';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

/*********************************************************
 * GET CURRENT USER - START
 *********************************************************/

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
    const profileUser = yield call(StorageUtils.getObjectValue, '@profileUser');
    if (!user) {
      yield put(triggerGetCurrentUserSucceded({ user, profileUser }));
    } else {
      const currentUser = auth().currentUser;
      if (currentUser == null) {
        yield put(triggerGetCurrentUserFailed('User not found'));
      }
      yield put(triggerGetCurrentUserSucceded({ user, profileUser }));
    }
  } catch (error) {
    console.log(error);
    yield put(triggerGetCurrentUserFailed('User not found'));
  }
}

/*********************************************************
 * GET CURRENT USER - END
 *********************************************************/

/*********************************************************
 * UPLOAD PROFILE PICTURE - START
 *********************************************************/

export const triggerUploadProfilePictureSucceded = createAction(
  'general/triggerUploadProfilePictureSucceded'
);

export const triggerUploadProfilePictureFailed = createAction(
  'general/triggerUploadProfilePictureFailed'
);

function uploadProfilePicture(payload) {
  try {
    return storage()
      .ref(payload.uid + getExtention(payload.result.assets[0].fileName))
      .putFile(payload.result.assets[0].uri);
  } catch (error) {
    throw error;
  }
}

function getDownloadUrl(payload) {
  try {
    return storage()
      .ref(payload.uid + getExtention(payload.result.assets[0].fileName))
      .getDownloadURL();
  } catch (error) {
    throw error;
  }
}

function updateProfileImageOfFirebase(payload) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .doc(payload.uid)
      .get()
      .then((query) => {
        const receivedData = query.data();
        firestore()
          .collection('users')
          .doc(payload.uid)
          .update({ ...receivedData, imageUrl: payload.url })
          .then(() => {
            resolve(true);
          });
      });
  });
}

export function* onTriggerUploadProfilePictureSaga(action) {
  try {
    const imageUploadResult = yield call(uploadProfilePicture, action.payload);
    const downloadURLResult = yield call(getDownloadUrl, action.payload);
    const firestoreUpdateResult = yield call(updateProfileImageOfFirebase, {
      uid: action.payload.uid,
      url: downloadURLResult,
    });
    StorageUtils.setObjectValue('@profileUser', {
      ...action.payload?.profileUser,
      imageUrl: downloadURLResult,
    });
    yield put(triggerUploadProfilePictureSucceded(downloadURLResult));
  } catch (error) {
    console.log(error);
    yield put(triggerUploadProfilePictureFailed('Image upload is not success'));
  }
}

/*********************************************************
 * UPLOAD PROFILE PICTURE - START
 *********************************************************/
