import { createAction } from '@reduxjs/toolkit';
import { put, delay, call } from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import { StorageUtils } from '../../utils/storage';
import firestore from '@react-native-firebase/firestore';

/*********************************************************
 * GET FRIENDS - START
 *********************************************************/

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
        resolve(documentSnapshot.docs);
      });
  });
}

export function* onTriggerGetFriendsSaga(action) {
  try {
    const friendsResult = yield call(getFriends, action.payload);
    const usersResult = yield call(getUsers, null);
    yield put(
      triggerGetFriendsSucceded({
        friends: friendsResult?.friends,
        users: usersResult,
        uid: action.payload,
      })
    );
  } catch (error) {
    console.log(error);
    yield put(triggerGetFriendsFailed('Friend list is not loaded'));
  }
}

/*********************************************************
 * GET FRIENDS - END
 *********************************************************/

/*********************************************************
 * SEND FRIEND REQUEST - START
 *********************************************************/

export const triggerSendFriendRequestSucceded = createAction(
  'friends/triggerSendFriendRequestSucceded'
);

export const triggerSendFriendRequestFailed = createAction(
  'friends/triggerSendFriendRequestFailed'
);

function sendFriendRequest({ item, uid }) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then((query) => {
        const receivedData = query.data();
        const udpatedData = {
          ...receivedData,
          friends: [...receivedData?.friends, { id: item?.id, status: 'sent_requests' }],
        };
        firestore()
          .collection('users')
          .doc(uid)
          .update(udpatedData)
          .then(() => {
            resolve(udpatedData);
          });
      })
      .catch((error) => {
        console.log(error);
        reject(new Error(error?.message));
      });
  });
}

function sendFriendRequestUpdateFriendObject({ item, uid }) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .doc(item.id)
      .get()
      .then((query) => {
        const receivedData = query.data();
        const udpatedData = {
          ...receivedData,
          friends: [...receivedData?.friends, { id: uid, status: 'received_requests' }],
        };
        firestore()
          .collection('users')
          .doc(item.id)
          .update(udpatedData)
          .then(() => {
            resolve(udpatedData);
          });
      })
      .catch((error) => {
        console.log(error);
        reject(new Error(error?.message));
      });
  });
}

export function* onTriggerSendFriendRequestSaga(action) {
  try {
    const sendRequestResult = yield call(sendFriendRequest, action.payload);
    const updateFriendObjectResult = yield call(
      sendFriendRequestUpdateFriendObject,
      action.payload
    );
    yield put(triggerSendFriendRequestSucceded(sendRequestResult));
  } catch (error) {
    console.log(error);
    yield put(triggerSendFriendRequestFailed('Friend request is not sent'));
  }
}

/*********************************************************
 * SEND FRIEND REQUEST - END
 *********************************************************/

/*********************************************************
 * CANCEL FRIEND REQUEST - START
 *********************************************************/

export const triggerCancelFriendRequestSucceded = createAction(
  'friends/triggerCancelFriendRequestSucceded'
);

export const triggerCancelFriendRequestFailed = createAction(
  'friends/triggerCancelFriendRequestFailed'
);

function cancelFriendRequest({ item, uid }) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then((query) => {
        const receivedData = query.data();
        const udpatedData = {
          ...receivedData,
          friends: receivedData?.friends?.filter((friend) => {
            return friend.id !== item?.id;
          }),
        };
        firestore()
          .collection('users')
          .doc(uid)
          .update(udpatedData)
          .then(() => {
            resolve(udpatedData);
          });
      })
      .catch((error) => {
        console.log(error);
        reject(new Error(error?.message));
      });
  });
}

function cancelFriendRequestUpdateFriendObject({ item, uid }) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .doc(item.id)
      .get()
      .then((query) => {
        const receivedData = query.data();
        const udpatedData = {
          ...receivedData,
          friends: receivedData?.friends?.filter((friend) => {
            return friend.id !== uid;
          }),
        };
        firestore()
          .collection('users')
          .doc(item.id)
          .update(udpatedData)
          .then(() => {
            resolve(udpatedData);
          });
      })
      .catch((error) => {
        console.log(error);
        reject(new Error(error?.message));
      });
  });
}

export function* onTriggerCancelFriendRequestSaga(action) {
  try {
    const cancelRequestResult = yield call(cancelFriendRequest, action.payload);
    const updateFriendObjectResult = yield call(
      cancelFriendRequestUpdateFriendObject,
      action.payload
    );

    yield put(triggerCancelFriendRequestSucceded(cancelRequestResult));
  } catch (error) {
    console.log(error);
    yield put(triggerCancelFriendRequestFailed('Friend request cancellation is not success'));
  }
}

/*********************************************************
 * CANCEL FRIEND REQUEST - END
 *********************************************************/

/*********************************************************
 * ACCEPT RECEIVED FRIEND REQUEST - START
 *********************************************************/

export const triggerAcceptReceivedFriendRequestSucceded = createAction(
  'friends/triggerAcceptReceivedFriendRequestSucceded'
);

export const triggerAcceptReceivedFriendRequestFailed = createAction(
  'friends/triggerAcceptReceivedFriendRequestFailed'
);

function acceptReceivedFriendRequest({ item, uid }) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then((query) => {
        const receivedData = query.data();
        const udpatedData = {
          ...receivedData,
          friends: [
            ...receivedData?.friends?.filter((friend) => {
              return friend.id !== item?.id;
            }),
            { id: item?.id, status: 'accepted' },
          ],
        };
        firestore()
          .collection('users')
          .doc(uid)
          .update(udpatedData)
          .then(() => {
            resolve(udpatedData);
          });
      })
      .catch((error) => {
        console.log(error);
        reject(new Error(error?.message));
      });
  });
}

function acceptReceivedFriendRequestUpdateFriendObject({ item, uid }) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .doc(item.id)
      .get()
      .then((query) => {
        const receivedData = query.data();
        const udpatedData = {
          ...receivedData,
          friends: [
            ...receivedData?.friends?.filter((friend) => {
              return friend.id !== uid;
            }),
            { id: uid, status: 'accepted' },
          ],
        };
        firestore()
          .collection('users')
          .doc(item.id)
          .update(udpatedData)
          .then(() => {
            resolve(udpatedData);
          });
      })
      .catch((error) => {
        console.log(error);
        reject(new Error(error?.message));
      });
  });
}

export function* onTriggerAcceptReceivedFriendRequestSaga(action) {
  try {
    const acceptReceivedRequestResult = yield call(acceptReceivedFriendRequest, action.payload);
    const updateFriendObjectResult = yield call(
      acceptReceivedFriendRequestUpdateFriendObject,
      action.payload
    );
    yield put(triggerAcceptReceivedFriendRequestSucceded(acceptReceivedRequestResult));
  } catch (error) {
    console.log(error);
    yield put(
      triggerAcceptReceivedFriendRequestFailed('Sorry, Friend request can not be accepted.')
    );
  }
}

/*********************************************************
 * ACCEPT RECEIVED FRIEND REQUEST - END
 *********************************************************/

/*********************************************************
 * REJECT RECEIVED FRIEND REQUEST - START
 *********************************************************/

export const triggerRejectReceivedFriendRequestSucceded = createAction(
  'friends/triggerRejectReceivedFriendRequestSucceded'
);

export const triggerRejectReceivedFriendRequestFailed = createAction(
  'friends/triggerRejectReceivedFriendRequestFailed'
);

function rejectReceivedFriendRequest({ item, uid }) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then((query) => {
        const receivedData = query.data();
        const udpatedData = {
          ...receivedData,
          friends: receivedData?.friends?.filter((friend) => {
            return friend.id !== item?.id;
          }),
        };
        firestore()
          .collection('users')
          .doc(uid)
          .update(udpatedData)
          .then(() => {
            resolve(udpatedData);
          });
      })
      .catch((error) => {
        console.log(error);
        reject(new Error(error?.message));
      });
  });
}

function rejectReceivedFriendRequestUpdateFriendObject({ item, uid }) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .doc(item.id)
      .get()
      .then((query) => {
        const receivedData = query.data();
        const udpatedData = {
          ...receivedData,
          friends: receivedData?.friends?.filter((friend) => {
            return friend.id !== uid;
          }),
        };
        firestore()
          .collection('users')
          .doc(item.id)
          .update(udpatedData)
          .then(() => {
            resolve(udpatedData);
          });
      })
      .catch((error) => {
        console.log(error);
        reject(new Error(error?.message));
      });
  });
}

export function* onTriggerRejectReceivedFriendRequestSaga(action) {
  try {
    const rejectReceivedRequestResult = yield call(rejectReceivedFriendRequest, action.payload);
    const updateFriendObjectResult = yield call(
      rejectReceivedFriendRequestUpdateFriendObject,
      action.payload
    );
    yield put(triggerRejectReceivedFriendRequestSucceded(rejectReceivedRequestResult));
  } catch (error) {
    console.log(error);
    yield put(
      triggerRejectReceivedFriendRequestFailed('Sorry, Friend request can not be rejected.')
    );
  }
}

/*********************************************************
 * REJECT RECEIVED FRIEND REQUEST - END
 *********************************************************/
