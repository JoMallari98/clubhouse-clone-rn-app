import { createAction } from '@reduxjs/toolkit';
import { put, delay, call, eventChannel } from 'redux-saga/effects';
import firestore from '@react-native-firebase/firestore';
import { DateUtils } from '../../utils/dateUtils';

/*********************************************************
 * FINA A ROOM - START
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

function createRoom({ settings }) {
  return new Promise((resolve, reject) => {
    const room = {
      chatRoomSettings: settings,
      participants: [],
      chatRoomStatus: 'PENDING',
      startedTime: DateUtils.getCurrentDate(),
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
      console.log('filtered room : ', filteredRoom);

      if (filteredRoom) {
        room = filteredRoom;
      } else {
        yield call(createRoom, action.payload);
        rooms = yield call(findRoom, action.payload);
        if (rooms != null && rooms.length > 0) {
          room = getFilteredRoom({ rooms, settings, globalSettings })[0];
        }
      }
    } else {
      // TODO: CREATE ROOM
      yield call(createRoom, action.payload);
      rooms = yield call(findRoom, action.payload);
      if (rooms != null && rooms.length > 0) {
        room = getFilteredRoom({ rooms, settings, globalSettings })[0];
      }
    }
    console.log('room : ', room);
    console.log('document Id  : ', room.id);
    console.log(
      'room size : ',
      globalSettings?.preferredPoolSizes?.filter((innerEl) => {
        return innerEl.id == settings?.selectedPreferredPoolSize;
      })[0]?.value
    );
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
