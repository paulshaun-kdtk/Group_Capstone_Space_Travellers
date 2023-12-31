import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// state
const initialState = {
  missions: [],
  status: 'idle',
  error: null,
  reservations: JSON.parse(localStorage.getItem('missionReservations')) || {},
};

const fetchMissions = createAsyncThunk('missions/fetchMissions', async () => {
  try {
    const response = await fetch('https://api.spacexdata.com/v3/missions');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching missions: ${error.message}`);
  }
});

const missionSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    reserveMission: (state, action) => {
      const { missionId } = action.payload;
      return {
        ...state,
        reservations: {
          ...state.reservations,
          [missionId]: true,
        },
      };
    },
    cancelMissionReservation: (state, action) => {
      const { missionId } = action.payload;
      return {
        ...state,
        reservations: {
          ...state.reservations,
          [missionId]: false,
        },
      };
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
