import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  rockets: [],
  status: 'idle',
  error: null,
  reservations: JSON.parse(localStorage.getItem('rocketReservations')) || {},
};

export const fetchRockets = createAsyncThunk('rockets/fetchRockets', async () => {
  try {
    const response = await fetch('https://api.spacexdata.com/v4/rockets');
    if (!response.ok) {
      throw new Error('Network error please check your network');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching rockets: ${error.message}`);
  }
});

const rocketSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    reserveRocket: (state, action) => {
      const { rocketId } = action.payload;
      state.reservations[rocketId] = true;
      localStorage.setItem('rocketReservations', JSON.stringify(state.reservations));
    },
    cancelReservation: (state, action) => {
      const { rocketId } = action.payload;
      state.reservations[rocketId] = false;
      localStorage.setItem('rocketReservations', JSON.stringify(state.reservations));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRockets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRockets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rockets = action.payload;
      })
      .addCase(fetchRockets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { reserveRocket, cancelReservation } = rocketSlice.actions;
export const selectAllRockets = (state) => state.rockets.rockets;
export const selectReservations = (state) => state.rockets.reservations;
export default rocketSlice.reducer;
