import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit' 

export interface validationState {
    errorDetailList: Array<string>
    errorItemList: Array<string>
}

const initialState: validationState = {
    errorDetailList: [],
    errorItemList: []
};

const validationSlice = createSlice({
    name: "validation",
    initialState,
    reducers: {
        setInitialValidation: (state) => {
            state.errorDetailList = [];
            state.errorItemList = [];
        },
        addErrorDetail: (state, action: PayloadAction<string>) => {
            state.errorDetailList.push(action.payload)
        },
        addErrorItem: (state, action: PayloadAction<string>) => {
            state.errorItemList.push(action.payload)
        }
    }
});

export const { 
    setInitialValidation,
    addErrorDetail,
    addErrorItem
} = validationSlice.actions;

export default validationSlice.reducer;