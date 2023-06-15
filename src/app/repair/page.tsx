'use client'

import React from 'react'
import { useState } from 'react'
import Category from '@/components/category/Category'
import Step from '@/utils/steps'
import ItemInfo from '@/components/item-info/ItemInfo'
import PersonalInfo from '@/components/personal-info/PersonalInfo'
import styles from './page.module.css'

function Repair() {
  const [step, setStep] = useState(Step.StepEnum.Category);
  const [category, setCategory] = useState("");

  function handleCategory(event: any){
    let info = event.target.value;
    setCategory(info);
    handleNextStep();
  }

  function handleItemInfo(event: any){
    
  }

  function handlePersonalInfo(event: any){

  }

  function handlePreviousStep(){
    let nextStep = Step.GetPreviousStep(step);
    if (nextStep != null) {
      setStep(nextStep);
    }
  }

  function handleNextStep(){
    let nextStep = Step.GetNextStep(step);
    if (nextStep != null) {
      setStep(nextStep);
    }
  }

  return (
    <div>
      {step == Step.StepEnum.Category && <Category handleCategory={handleCategory}/>}
      {step == Step.StepEnum.ItemInfo && <ItemInfo category={category} handleItemInfo={handleItemInfo}/>}
      {step == Step.StepEnum.PersonalInfo && <PersonalInfo handlePersonalInfo={handlePersonalInfo}/>}
      {step != Step.StepEnum.Category &&
        <div className={styles["button-row-container"]}>
          <button 
            type='button' 
            className={styles.button} 
            onClick={(event:any) => handlePreviousStep()}
          >
            Back
          </button>
          <button 
            type='submit' 
            className={styles.button}
            onClick={(event:any) => handleNextStep()}
          >
            Next
          </button>
        </div>
      }
    </div>
  )
}

export default Repair