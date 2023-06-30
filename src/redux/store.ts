import { configureStore } from "@reduxjs/toolkit";

import infoReducer from "./slices/infoSlice"
import stepReducer from "./slices/stepSlice"
import validationReducer from "./slices/validationSlice"

export const store = configureStore({
    reducer: {
        info: infoReducer,
        step: stepReducer,
        validation: validationReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;