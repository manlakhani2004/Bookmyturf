import { createSlice } from "@reduxjs/toolkit";

const selectedSlotSlice = createSlice({
  name: "selectedSlotIds",
  initialState: {
    // keep both arrays: ids for backend, slot objects for UI
    selectedSlotIds: [],
    selectedSlots: [], // array of slot objects: { slotId, dayOfWeek, startTime, endTime, price, date, ... }
  },
  reducers: {
    // payload: slot object (must contain slotId)
    addSlot: (state, action) => {
      const slot = action.payload;
      if (!slot || !slot.slotId) return;
      if (!state.selectedSlotIds.includes(slot.slotId)) {
        state.selectedSlotIds.push(slot.slotId);
        state.selectedSlots.push(slot);
      }
    },
    // payload: slotId
    removeSlotById: (state, action) => {
      const id = action.payload;
      state.selectedSlotIds = state.selectedSlotIds.filter((sid) => sid !== id);
      state.selectedSlots = state.selectedSlots.filter((s) => s.slotId !== id);
    },
    // clears both arrays
    clearAllSlots: (state) => {
      state.selectedSlotIds = [];
      state.selectedSlots = [];
    },
    // optional: replace whole selection (payload: { ids: [], slots: [] })
    setAllSlots: (state, action) => {
      const { ids, slots } = action.payload || {};
      state.selectedSlotIds = Array.isArray(ids) ? ids : [];
      state.selectedSlots = Array.isArray(slots) ? slots : [];
    },
  },
});

export const { addSlot, removeSlotById, clearAllSlots, setAllSlots } =
  selectedSlotSlice.actions;
export default selectedSlotSlice.reducer;
