import { combineReducers } from "@reduxjs/toolkit";
import authSlice  from "../slices/auth";
import profileSlice  from "../slices/profile";
import citySlice from "../slices/city"
import selectedslotSlice from  "../slices/selectedSlotSlice";
const rootReducer = combineReducers(
    {
        auth:authSlice,
        profile:profileSlice,
        city:citySlice,
        selectedSlotIds:selectedslotSlice
    }
)

export default rootReducer;