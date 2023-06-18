import { configureStore } from "@reduxjs/toolkit";

import infoReducer from "./slices/infoSlice"
import stepReducer from "./slices/stepSlice"

export const store = configureStore({
    reducer: {
        info: infoReducer,
        step: stepReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;