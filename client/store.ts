import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from './src/slices/signup'

export const store = configureStore({
    reducer:{
        toggleSignUp: signUpReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch