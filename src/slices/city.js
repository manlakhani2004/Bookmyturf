import { createSlice } from "@reduxjs/toolkit";

const citySlice = createSlice({
  name: "city",
  initialState: {
    city: "Ahmedabad",
    data: [],
  },
  reducers: {
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    setCityData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateCity, setCityData } = citySlice.actions;
export default citySlice.reducer;
