import { createSlice } from "@reduxjs/toolkit";

const selectedSlotSlice = createSlice({
  name: "selectedSlotIds",
  initialState: {
    selectedSlotIds: [],
  },
  reducers: {
    addSlotId: (state, action) => {
      if (!state.selectedSlotIds.includes(action.payload)) {
        state.selectedSlotIds.push(action.payload);
      }
    },
    removeSlotId: (state, action) => {
      state.selectedSlotIds = state.selectedSlotIds.filter(
        (id) => id !== action.payload
      );
    },
    clearAllSlots: (state) => {
      state.selectedSlotIds = [];
    },
  },
});

export const { addSlotId, removeSlotId, clearAllSlots } = selectedSlotSlice.actions;
export default selectedSlotSlice.reducer;
