import { takeLeading } from 'redux-saga/effects';
import { onTriggerSignUpSaga } from './signUp/signUpSagas';
import { onTriggerSignInSaga } from './signIn/signInSagas';
import {
  onTriggerGetCurrentUserSaga,
  onTriggerUploadProfilePictureSaga,
} from './general/generalSagas';
import { onTriggerSaga } from './counter/counterSagas';
import {
  onTriggerGetGlobalSettingsSaga,
  onTriggerGetUserChatSettingsSaga,
  onTriggerUpdateUserChatSettingsSaga,
} from './settings/settingsSagas';
import {
  onTriggerAcceptReceivedFriendRequestSaga,
  onTriggerCancelFriendRequestSaga,
  onTriggerGetFriendsSaga,
  onTriggerRejectReceivedFriendRequestSaga,
  onTriggerSendFriendRequestSaga,
} from './friends/friendsSagas';

function* rootSaga() {
  yield takeLeading('signUp/triggerSignUpSaga', onTriggerSignUpSaga);
  yield takeLeading('signIn/triggerSignInSaga', onTriggerSignInSaga);
  yield takeLeading('general/triggerGetCurrentUser', onTriggerGetCurrentUserSaga);
  yield takeLeading('general/triggerUploadProfilePicture', onTriggerUploadProfilePictureSaga);
  yield takeLeading('settings/triggerGetGlobalSettings', onTriggerGetGlobalSettingsSaga);
  yield takeLeading('settings/triggerGetUserChatSettings', onTriggerGetUserChatSettingsSaga);
  yield takeLeading('settings/triggerUpdateUserChatSettings', onTriggerUpdateUserChatSettingsSaga);
  yield takeLeading('friends/triggerGetFriends', onTriggerGetFriendsSaga);
  yield takeLeading('friends/triggerSendFriendRequest', onTriggerSendFriendRequestSaga);
  yield takeLeading('friends/triggerCancelFriendRequest', onTriggerCancelFriendRequestSaga);
  yield takeLeading(
    'friends/triggerAcceptReceivedFriendRequest',
    onTriggerAcceptReceivedFriendRequestSaga
  );
  yield takeLeading(
    'friends/triggerRejectReceivedFriendRequest',
    onTriggerRejectReceivedFriendRequestSaga
  );
  yield takeLeading('counter/triggerSaga', onTriggerSaga);
}

export default rootSaga;
