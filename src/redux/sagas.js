import { takeLeading } from 'redux-saga/effects';
import { onTriggerSignUpSaga } from './signUp/signUpSagas';
import { onTriggerSignInSaga } from './signIn/signInSagas';
import { onTriggerGetCurrentUserSaga } from './general/generalSagas';
import { onTriggerSaga } from './counter/counterSagas';
import {
  onTriggerGetGlobalSettingsSaga,
  onTriggerGetUserChatSettingsSaga,
  onTriggerUpdateUserChatSettingsSaga,
} from './settings/settingsSagas';
import { onTriggerGetFriendsSaga } from './friends/friendsSagas';

function* rootSaga() {
  yield takeLeading('signUp/triggerSignUpSaga', onTriggerSignUpSaga);
  yield takeLeading('signIn/triggerSignInSaga', onTriggerSignInSaga);
  yield takeLeading('general/triggerGetCurrentUser', onTriggerGetCurrentUserSaga);
  yield takeLeading('settings/triggerGetGlobalSettings', onTriggerGetGlobalSettingsSaga);
  yield takeLeading('settings/triggerGetUserChatSettings', onTriggerGetUserChatSettingsSaga);
  yield takeLeading('settings/triggerUpdateUserChatSettings', onTriggerUpdateUserChatSettingsSaga);
  yield takeLeading('friends/triggerGetFriends', onTriggerGetFriendsSaga);
  yield takeLeading('counter/triggerSaga', onTriggerSaga);
}

export default rootSaga;
