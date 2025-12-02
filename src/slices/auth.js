import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem("token") || null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;   // ✅ FIXED
        },
        setSignUpData(state, action) {
            state.signupData = action.payload;
        }
    }
});

export const { setLoading, setSignUpData, setToken } = authSlice.actions;
export default authSlice.reducer;
