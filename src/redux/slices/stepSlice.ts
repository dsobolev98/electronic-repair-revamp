import Step from '@/utils/steps'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit' 

export interface stepState {
    step: Step.StepEnum
}

const initialState: stepState = {
    step: Step.StepEnum.Category
};

const stepSlice = createSlice({
    name: "step",
    initialState,
    reducers: {
        setStep: (state: any, action: PayloadAction<Step.StepEnum>) => {
            state.step = action.payload;
        },
        setInitialStep: (state: any) => {
            state.step = initialState.step
        }
    }
});

export const { setStep, setInitialStep } = stepSlice.actions;
export default stepSlice.reducer;