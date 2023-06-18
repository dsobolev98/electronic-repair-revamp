import Step from '@/utils/steps'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit' 

export interface infoState {
    category: string
}

const initialState: infoState = {
    category: ""
};

const infoSlice = createSlice({
    name: "info",
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        }
    }
});

export const { setCategory } = infoSlice.actions;
export default infoSlice.reducer;