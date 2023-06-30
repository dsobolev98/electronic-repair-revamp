import React from 'react'
import styles from './navigation.module.css'
import Step, { StepEnum } from '@/utils/steps'

import { store } from '@/redux/store';
import { setStep } from '@/redux/slices/stepSlice';
import { useAppSelector } from '@/redux/hooks';
import { ItemDictionary, ItemInfo, itemInfoConfig } from '@/types/ItemInfo';
import { PersonalInfo, personalInfoConfig } from '@/types/PersonalInfo';
import { current } from '@reduxjs/toolkit';
import { IsModelValid } from '@/utils/validation';
import { setInitialValidation } from '@/redux/slices/validationSlice';

export default function Navigation({
    displayBackStep = true,
    displayNextStep = true,
    validate = false
}:{
    displayBackStep?: boolean,
    displayNextStep?: boolean,
    validate?: boolean
}) {
    const step = useAppSelector((state:any) => state.step.step as Step.StepEnum)

    function handlePreviousStep(){
        let nextStep = Step.GetPreviousStep(step);
        if (nextStep != null) {
          store.dispatch(setStep(nextStep));
        }
    }
    
    function handleNextStep(){
        if (validate){
            store.dispatch(setInitialValidation())

            if(step == StepEnum.ItemInfo) {
                const currentItem = store.getState().info.currentItemUId
                const itemInfoData = store.getState().info.item[currentItem]

                if(!IsModelValid(itemInfoData, itemInfoConfig, step))
                    return;
            }
            else if(step == StepEnum.PersonalInfo) {
                const personalInfoData = store.getState().info.personal

                if(!IsModelValid(personalInfoData, personalInfoConfig, step))
                    return;
            }
        }

        let nextStep = Step.GetNextStep(step);
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
