import { takeLeading } from 'redux-saga/effects';
import { onTriggerSignUpSaga } from './signUp/signUpSagas';
import { onTriggerSignInSaga } from './signIn/signInSagas';
import { onTriggerSaga } from './counter/counterSagas';

function* rootSaga() {
  yield takeLeading('signUp/triggerSignUpSaga', onTriggerSignUpSaga);
  yield takeLeading('signIn/triggerSignInSaga', onTriggerSignInSaga);
  yield takeLeading('counter/triggerSaga', onTriggerSaga);
}

export default rootSaga;
