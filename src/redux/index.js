import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootSaga from './sagas';
import counterReducer from './counter/counterSlice';
import generalReducer from './general/generalSlice';
import signInReducer from './signIn/signInSlice';
import signUpReducer from './signUp/signUpSlice';
import settingsReducer from './settings/settingsSlice';
import startALobbyReducer from './startALobby/startALobbySlice';
import friendsReducer from './friends/friendsSlice';
import roomsReducer from './rooms/roomsSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  counter: counterReducer,
  general: generalReducer,
  signIn: signInReducer,
  signUp: signUpReducer,
  settings: settingsReducer,
  startALobby: startALobbyReducer,
  friends: friendsReducer,
  rooms: roomsReducer,
});

//const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
