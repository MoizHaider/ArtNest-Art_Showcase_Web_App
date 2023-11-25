"use client"

import { configureStore } from "@reduxjs/toolkit";
import postReucer from "./Features/PostsSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer
    }
})

export const rootState = store.getState;
export const appDispatch = store.dispatch; 