import React from 'react'
import styles from './navigation.module.css'
import Step, { StepEnum } from '@/utils/steps'

import { store } from '@/redux/store';
import { setStep } from '@/redux/slices/stepSlice';
import { useAppSelector } from '@/redux/hooks';

export default function Navigation({
    displayBackStep = true,
    displayNextStep = true,
    customNextFunction = undefined, 
}:{
    displayBackStep?: boolean,
    displayNextStep?: boolean,
    customNextFunction?: Function
}) {
    const step = useAppSelector((state:any) => state.step.step as Step.StepEnum)

    function handlePreviousStep(){
        let nextStep = Step.GetPreviousStep(step);
        if (nextStep != null) {
          store.dispatch(setStep(nextStep));
        }
    }
    
    async function handleNextStep(){
        if(customNextFunction !== undefined && customNextFunction !== null) {
            let result: boolean = await customNextFunction()
            if (result === false) 
                return;
        }

        let nextStep = await Step.GetNextStep(step);
        if (nextStep != null) {
            store.dispatch(setStep(nextStep));
        }
    }

    return (
        <div className={styles["button-row-container"]}>
            {
                displayNextStep &&
                <button 
                    type='submit' 
                    className={`${styles.button} ${styles["button-next"]}`}
                    onClick={(event:any) => handleNextStep()}
                    id='button-navigation-next'
                >
                    Next
                </button>
            }
            {   
                displayBackStep &&
                <button 
                    type='button' 
                    className={`${styles.button} ${styles["button-previous"]}`}
                    onClick={(event:any) => handlePreviousStep()}
                    id='button-navigation-previous'
                >
                    Back
                </button>
            }
        </div>
    )
}
