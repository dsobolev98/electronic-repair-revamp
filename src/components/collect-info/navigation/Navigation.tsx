import React from 'react'
import styles from './navigation.module.css'
import Step from '@/utils/steps'

import { store } from '@/redux/store';
import { setStep } from '@/redux/slices/stepSlice';

export default function Navigation({
    displayBackStep = true,
    displayNextStep = true
}:{
    displayBackStep?: boolean,
    displayNextStep?: boolean
}) {

    function handlePreviousStep(){
        let nextStep = Step.GetPreviousStep(store.getState().step.step);
        if (nextStep != null) {
          store.dispatch(setStep(nextStep));
        }
      }
    
    function handleNextStep(){
        let nextStep = Step.GetNextStep(store.getState().step.step);
        if (nextStep != null) {
            store.dispatch(setStep(nextStep));
        }
    }

    return (
        <div className={styles["button-row-container"]}>
            {   
                displayBackStep &&
                <button 
                    type='button' 
                    className={`${styles.button}`}
                    onClick={(event:any) => handlePreviousStep()}
                >
                    Back
                </button>
            }
            {
                displayNextStep &&
                <button 
                    type='submit' 
                    className={`${styles.button}`}
                    onClick={(event:any) => handleNextStep()}
                >
                    Next
                </button>
            }
        </div>
    )
}
