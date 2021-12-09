import { createAction } from '@reduxjs/toolkit';
import { put, delay, call, eventChannel } from 'redux-saga/effects';
import firestore from '@react-native-firebase/firestore';
import { DateUtils } from '../../utils/dateUtils';
import functions from '@react-native-firebase/functions';

/*********************************************************
 * FIND A ROOM - START
 *********************************************************/

export const triggerFindRoomSucceded = createAction('rooms/triggerFindRoomSucceded');

export const triggerFindRoomFailed = createAction('rooms/triggerFindRoomFailed');

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

function findRoom({ settings }) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('rooms')
      .get()
      .then((documentSnapshot) => {
        resolve(documentSnapshot?.docs);
      });
  });
}

function createRoom({ settings, globalSettings }) {
  console.log('create room ***************', settings, globalSettings);
  return new Promise((resolve, reject) => {
    const room = {
      name:
        globalSettings?.chatRoomTypes?.filter((el) => el.id == settings?.selectedChatRoomType)[0]
          ?.value ?? '',
      chatRoomSettings: settings,
      participants: [],
      chatRoomStatus: 'PENDING',
      startedTime: null,
      endTime: null,
    };
    firestore()
      .collection('rooms')
      .doc()
      .set(room)
      .then(() => {
        resolve(room);
      });
  });
}

function generateToken({ room, user }) {
  //http://172.20.10.5:5001
  return new Promise((resolve, reject) => {
    functions().useFunctionsEmulator('http://172.20.10.5:5001');
      functions()
      .httpsCallable("createCallsWithTokens")({
        channelId: 'sldkfjlsklkf'
      }).then((response) => {
          console.log('generate token ===================>', response);
          resolve(true);
        });
  });
}

function addParticipantToTheRoom({ room, user }) {
  return new Promise((resolve, reject) => {
    const isExistingParticipant = room.data().participants.filter((el) => el.id == user.id);
    var roomData = { ...room.data() };
    if (isExistingParticipant == null || isExistingParticipant?.length == 0) {
      roomData = {
        ...room.data(),
        participants: [
          ...room.data().participants,
          { id: user.id, isOrganizer: false, isMuted: false },
        ],
      };
    }
    firestore()
      .collection('rooms')
      .doc(room?.id)
      .update(roomData)
      .then(() => {
        resolve(roomData);
      });
  });
}

function getFilteredRoom({ rooms, settings, globalSettings }) {
  return rooms.filter((el) => {
    const { chatRoomSettings, chatRoomStatus, participants } = el.data();
    return (
      chatRoomSettings?.selectedChatRoomType == settings?.selectedChatRoomType &&
      chatRoomSettings?.selectedEstCommuteType == settings?.selectedEstCommuteType &&
      chatRoomSettings?.selectedPreferredPoolSize == settings?.selectedPreferredPoolSize &&
      chatRoomSettings?.oneOnOneSelection == settings?.oneOnOneSelection &&
      chatRoomStatus == 'PENDING' &&
      participants?.length <
        globalSettings?.preferredPoolSizes?.filter((innerEl) => {
          return innerEl.id == settings?.selectedPreferredPoolSize;
        })[0]?.value
    );
  });
}

export function* onTriggerFindRoomSaga(action) {
  try {
    const { settings, user } = action.payload;
    const globalSettings = yield call(getGlobalSettings, null);

    var rooms = yield call(findRoom, action.payload);
    var room = null;

    if (rooms != null && rooms.length > 0) {
      const filteredRoom = getFilteredRoom({ rooms, settings, globalSettings })[0];

      if (filteredRoom) {
        room = filteredRoom;
      } else {
        yield call(createRoom, { settings, globalSettings });
        rooms = yield call(findRoom, action.payload);
        if (rooms != null && rooms.length > 0) {
          room = getFilteredRoom({ rooms, settings, globalSettings })[0];
        }
      }
    } else {
      // TODO: CREATE ROOM
      yield call(createRoom, { settings, globalSettings });
      rooms = yield call(findRoom, action.payload);
      if (rooms != null && rooms.length > 0) {
        room = getFilteredRoom({ rooms, settings, globalSettings })[0];
      }
    }

    // TODO : GENERATE TOKEN
    //yield call(generateToken, { room, user });

    // TODO : ADD PARTICIPANT TO ROOM
    const addParticipantResult = yield call(addParticipantToTheRoom, {
      room,
      user,
    });

    if (addParticipantResult) {
      yield put(
        triggerFindRoomSucceded({
          room: addParticipantResult,
          roomId: room.id,
          roomSize: globalSettings?.preferredPoolSizes?.filter((innerEl) => {
            return innerEl.id == settings?.selectedPreferredPoolSize;
          })[0]?.value,
        })
      );
      return;
    }
    yield put(triggerFindRoomFailed('Chat room not found'));
  } catch (error) {
    console.log(error);
    yield put(triggerFindRoomFailed('Chat room not found'));
  }
}

/*********************************************************
 * FIND A ROOM - END
 *********************************************************/

/*********************************************************
 * UPDATE ROOM STATUS - START
 *********************************************************/

export const triggerUpdateRoomStatusSucceded = createAction(
  'rooms/triggerUpdateRoomStatusSucceded'
);

export const triggerUpdateRoomStatusFailed = createAction('rooms/triggerUpdateRoomStatusFailed');

function updateRoomStatus({ room, roomId, status }) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('rooms')
      .doc(roomId)
      .get()
      .then((query) => {
        const receivedData = query.data();

        firestore()
          .collection('rooms')
          .doc(roomId)
          .update({
            ...receivedData,
            chatRoomStatus: status,
            startedTime: DateUtils.getCurrentDate(),
          })
          .then(() => {
            resolve(true);
          });
      });
  });
}

export function* onTriggerUpdateRoomStatusSaga(action) {
  try {
    const updateStatus = yield call(updateRoomStatus, action.payload);
    if (updateStatus) {
      yield put(triggerUpdateRoomStatusSucceded(null));
    } else {
      yield put(triggerUpdateRoomStatusFailed('Room status is not updated'));
    }
  } catch (error) {
    console.log(error);
    yield put(triggerUpdateRoomStatusFailed('Room status is not updated'));
  }
}

/*********************************************************
 * UPDATE ROOM STATUS - END
 *********************************************************/

/*********************************************************
 * UPDATE MIC STATUS - START
 *********************************************************/

export const triggerUpdateMicStatusSucceded = createAction('rooms/triggerUpdateMicStatusSucceded');

export const triggerUpdateMicStatusFailed = createAction('rooms/triggerUpdateMicStatusFailed');

function updateMicStatus({ room, roomId, uid, status }) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('rooms')
      .doc(roomId)
      .get()
      .then((query) => {
        const receivedData = query.data();

        const modifiedParticipants = [];
        receivedData?.participants?.forEach((element) => {
          if (element.id == uid) {
            modifiedParticipants.push({ ...element, isMuted: status });
          } else {
            modifiedParticipants.push(element);
          }
        });
        firestore()
          .collection('rooms')
          .doc(roomId)
          .update({ ...receivedData, participants: modifiedParticipants })
          .then(() => {
            resolve(true);
          });
      });
  });
}

export function* onTriggerUpdateMicStatusSaga(action) {
  try {
    const updateStatus = yield call(updateMicStatus, action.payload);

    if (updateStatus) {
      yield put(triggerUpdateMicStatusSucceded(null));
    } else {
      yield put(triggerUpdateMicStatusFailed('Mic status is not updated'));
    }
  } catch (error) {
    console.log(error);
    yield put(triggerUpdateMicStatusFailed('Mic status is not updated'));
  }
}

/*********************************************************
 * UPDATE MIC STATUS - END
 *********************************************************/

/*********************************************************
 * LEAVE ROOM - START
 *********************************************************/

export const triggerLeaveRoomSucceded = createAction('rooms/triggerLeaveRoomSucceded');

export const triggerLeaveRoomFailed = createAction('rooms/triggerLeaveRoomFailed');

function leaveRoom({ roomId, uid }) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('rooms')
      .doc(roomId)
      .get()
      .then((query) => {
        const receivedData = query.data();

        const modifiedParticipants = [];
        receivedData?.participants?.forEach((element) => {
          if (element.id == uid) {
            modifiedParticipants.push({ ...element, isLeft: true });
          } else {
            modifiedParticipants.push(element);
          }
        });
        firestore()
          .collection('rooms')
          .doc(roomId)
          .update({ ...receivedData, participants: modifiedParticipants })
          .then(() => {
            resolve(true);
          });
      });
  });
}

export function* onTriggerLeaveRoomSaga(action) {
  try {
    const updateStatus = yield call(leaveRoom, action.payload);

    if (updateStatus) {
      yield put(triggerLeaveRoomSucceded(null));
    } else {
      yield put(triggerLeaveRoomFailed('Leave room is not successfull'));
    }
  } catch (error) {
    console.log(error);
    yield put(triggerLeaveRoomFailed('Leave room is not successfull'));
  }
}

/*********************************************************
 * LEAVE ROOM - END
 *********************************************************/

/*********************************************************
 * GET PREVIOUS CHAT ROOMS - START
 *********************************************************/

export const triggerGetPreviousChatRoomsSucceded = createAction(
  'rooms/triggerGetPreviousChatRoomsSucceded'
);

export const triggerGetPreviousChatRoomsFailed = createAction(
  'rooms/triggerGetPreviousChatRoomsFailed'
);

function getPreviousChatRooms({ uid, allUsers }) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('rooms')
      .get()
      .then((query) => {
        const receivedData = query.docs;
        const previousChatRooms = [];
        receivedData?.forEach((element) => {
          const isParticipant = element?.data()?.participants?.filter((el) => el.id == uid);

          if (isParticipant && isParticipant?.length > 0) {
            //load imageUrl
            const modifiedParticipants = [];
            element?.data()?.participants?.forEach((partElem) => {
              const filteredUser = allUsers?.filter((user) => {
                return partElem.id == user.data()?.id;
              });
              modifiedParticipants.push({
                ...partElem,
                imageUrl: filteredUser[0]?.data()?.imageUrl,
              });
            });
            previousChatRooms.push({
              ...element?.data(),
              id: element?.id,
              participants: modifiedParticipants,
            });
          }
        });
        console.log('rec prev chat room >>>>>>>>', previousChatRooms);
        resolve(previousChatRooms);
      });
  });
}

export function* onTriggerGetPreviousChatRoomsSaga(action) {
  try {
    const prevChatRoomResponse = yield call(getPreviousChatRooms, action.payload);
    console.log('update status : ', prevChatRoomResponse);
    if (prevChatRoomResponse) {
      yield put(triggerGetPreviousChatRoomsSucceded(prevChatRoomResponse));
    } else {
      yield put(triggerGetPreviousChatRoomsFailed('Leave room is not successfull'));
    }
  } catch (error) {
    console.log(error);
    yield put(triggerGetPreviousChatRoomsFailed('Leave room is not successfull'));
  }
}

/*********************************************************
 * GET PREVIOUS CHAT ROOMS - END
 *********************************************************/

/*********************************************************
 * REJOIN ROOM - START
 *********************************************************/

export const triggerRejoinRoomSucceded = createAction('rooms/triggerRejoinRoomSucceded');

export const triggerRejoinRoomFailed = createAction('rooms/triggerRejoinRoomFailed');

function rejoinRoom({ roomId, uid, settings, globalSettings }) {
  console.log('received params : ', roomId, uid);
  return new Promise((resolve, reject) => {
    firestore()
      .collection('rooms')
      .doc(roomId)
      .get()
      .then((query) => {
        const receivedData = query.data();
        console.log('received data >>>>>>> : ', query.id, roomId);
        const modifiedParticipants = [];
        receivedData?.participants?.forEach((element) => {
          if (element.id == uid) {
            modifiedParticipants.push({ ...element, isLeft: false });
          } else {
            modifiedParticipants.push(element);
          }
        });
        firestore()
          .collection('rooms')
          .doc(roomId)
          .update({ ...receivedData, participants: modifiedParticipants })
          .then(() => {
            resolve({
              room: { ...receivedData, participants: modifiedParticipants },
              roomId: roomId,
              roomSize: globalSettings?.preferredPoolSizes?.filter((innerEl) => {
                return innerEl.id == settings?.selectedPreferredPoolSize;
              })[0]?.value,
            });
          });
      });
  });
}

export function* onTriggerRejoinRoomSaga(action) {
  try {
    const globalSettings = yield call(getGlobalSettings, null);
    const updateStatus = yield call(rejoinRoom, { ...action.payload, globalSettings });
    console.log('$$$$$$$$$$$$$$$$ upated status ; ', updateStatus);
    if (updateStatus) {
      yield put(triggerRejoinRoomSucceded(updateStatus));
    } else {
      yield put(triggerRejoinRoomFailed('Rejoin room is not successfull'));
    }
  } catch (error) {
    console.log(error);
    yield put(triggerRejoinRoomFailed('Rejoin room is not successfull'));
  }
}

/*********************************************************
 * REJOIN ROOM - END
 *********************************************************/
