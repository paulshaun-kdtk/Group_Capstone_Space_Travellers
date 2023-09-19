import { createSlice } from '@reduxjs/toolkit';

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState: [],
  reducers: {
    // Define your rocket-related actions and reducers here
  },
});

export const { /* Export your actions here */ } = rocketsSlice.actions;
export default rocketsSlice.reducer;
