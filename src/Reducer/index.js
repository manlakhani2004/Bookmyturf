import { combineReducers } from "@reduxjs/toolkit";
import authSlice  from "../slices/auth";
import profileSlice  from "../slices/profile";
import citySlice from "../slices/city"
const rootReducer = combineReducers(
    {
        auth:authSlice,
        profile:profileSlice,
        city:citySlice
    }
)

export default rootReducer;