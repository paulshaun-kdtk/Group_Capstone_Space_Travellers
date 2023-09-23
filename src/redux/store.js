import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist';
import rocketSlice from './rockets/rocketsSlice';
import missionSlice from './missions/missionsSlice';
// import reservedSlice from './profile/profileSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = {
  rockets: rocketSlice,
  missions: missionSlice,
  //  reservations: reservedSlice,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer),
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
