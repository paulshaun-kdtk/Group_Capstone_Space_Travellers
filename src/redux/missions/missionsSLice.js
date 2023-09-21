import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  missions: [],
  status: 'idle',
  error: null,
  reservations: JSON.parse(localStorage.getItem('missionReservations')) || {},
};

const fetchMissions = createAsyncThunk('missions/fetchMissions', async () => {
  const response = await axios.get('https://api.spacexdata.com/v3/missions');
  return response.data;
});

const missionSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    reserveMission: (state, action) => {
      const { missionId } = action.payload;
      state.reservations[missionId] = true;
      localStorage.setItem('missionReservations', JSON.stringify(state.reservations));
    },
    cancelMissionReservation: (state, action) => {
      const { missionId } = action.payload;
      state.reservations[missionId] = false;
      localStorage.setItem('missionReservations', JSON.stringify(state.reservations));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.missions = action.payload;
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { reserveMission, cancelMissionReservation } = missionSlice.actions;
export { fetchMissions };
export const selectAllMissions = (state) => state.missions.missions;
export const selectMissionReservations = (state) => state.missions.reservations;
export default missionSlice.reducer;
