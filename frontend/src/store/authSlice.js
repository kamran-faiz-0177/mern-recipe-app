import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    email: null,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signIn: (state, action) => {
            state.isLoggedIn = true;
            state.email = action.payload.email;
            state.user = action.payload.user;
        },
        signOut: (state) => {
            state.isLoggedIn = false;
            state.email = null;
            state.user = null;
        },
    },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
        