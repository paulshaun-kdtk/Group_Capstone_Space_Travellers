import { configureStore } from '@reduxjs/toolkit';
import rocketsSlice from './rockets/rocketsSlice';
import missionsSLice from './missions/missionsSLice';

const store = configureStore({
  reducer: {
    rockets: rocketsSlice,
    missions: missionsSLice,
  },
});

export default store;
