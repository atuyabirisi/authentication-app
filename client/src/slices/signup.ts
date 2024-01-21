import { createSlice } from "@reduxjs/toolkit";

interface SignUpState{
    isOpen: boolean,
}

const initialState = {
    isOpen: false,
} as SignUpState

const SignUpSlice = createSlice({
    name: 'toggleSignUp',
    initialState,
    reducers:{
        openSignUp: (state => {
            state.isOpen = true;
        }),
        backToLogin: (state => {
            state.isOpen = false;
        }),
    },
});

export const { openSignUp, backToLogin } = SignUpSlice.actions;
export default SignUpSlice.reducer;