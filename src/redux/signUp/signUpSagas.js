import { createAction } from '@reduxjs/toolkit';
import { put, delay, call } from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import { StorageUtils } from '../../utils/storage';
import firestore from '@react-native-firebase/firestore';

export const triggerSignUpSucceded = createAction('signUp/triggerSignUpSucceded');

export const triggerSignUpFailed = createAction('signUp/triggerSignUpFailed');

function signUp(payload) {
  try {
    return auth().createUserWithEmailAndPassword(payload.email, payload.password);
  } catch (error) {
    throw error;
  }
}

function createUser({ payload, result }) {
  console.log('received payload : ', payload);
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .doc(result?.user?.uid)
      .set({
        id: result?.user?.uid,
        fullName: payload.fullName,
        username: '@' + payload.fullName.replace(/\s+/g, '.')?.toLowerCase(),
        email: payload.email,
        defaultChatRoomSettings: {},
        imageUrl: '',
        rating: '0',
        numberOfRatings: '0',
        meetingStatus: 'available',
        friends: [],
      })
      .then(() => {
        resolve(true);
      });
  });
}

export function* onTriggerSignUpSaga(action) {
  try {
    //signup with firebase auth
    const signUpResult = yield call(signUp, action.payload);

    //add user to firestore
    const userCreationResult = yield call(createUser, {
      payload: action.payload,
      result: signUpResult,
    });

    if (userCreationResult) {
      // set user details to local storage
      StorageUtils.setObjectValue('@user', signUpResult?.user);
      yield put(triggerSignUpSucceded(signUpResult));
    } else {
      yield put(triggerSignUpFailed('User signup failed'));
    }
  } catch (error) {
    console.log(error);
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
