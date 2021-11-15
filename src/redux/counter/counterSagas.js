import { createAction } from '@reduxjs/toolkit';
import { put, delay } from 'redux-saga/effects';

export const triggerSagaSucceeded = createAction('counter/triggerSagaSucceeded');

export const triggerSagaFailed = createAction('counter/triggerSagaFailed');

export function* onTriggerSaga(action) {
  try {
    yield delay(5000);
    const random = Math.random();
    if (random > 0.5) throw new Error('Number is too high');
    yield put(triggerSagaSucceeded(random));
  } catch (e) {
    yield put(triggerSagaFailed(e.message));
  }
}
