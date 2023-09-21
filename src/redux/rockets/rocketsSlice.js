import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  rockets: [],
  status: 'idle',
  error: null,
  reservations: JSON.parse(localStorage.getItem('rocketReservations')) || {},
};

export const fetchRockets = createAsyncThunk('rockets/fetchRockets', async () => {
  const response = await axios.get('https://api.spacexdata.com/v4/rockets');
  return response.data;
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
