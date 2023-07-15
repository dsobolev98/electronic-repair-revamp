"use client"

import React from 'react'
import styles from './item-info.module.css'
import Navigation from '../navigation/Navigation'
import Validation from '../validation/Validation'
import { ItemInfo as ItemInfoType, itemInfoConfig } from '@/types/ItemInfo'

import { store } from '@/redux/store'
import { useAppSelector } from '@/redux/hooks'
import { setInitialItem, updateItemField } from '@/redux/slices/infoSlice'
import { setInitialStep } from '@/redux/slices/stepSlice'
import { IsModelValid } from '@/utils/validation'
import { setInitialValidation } from '@/redux/slices/validationSlice'
import Step from '@/utils/steps'

export default function ItemInfo({
  itemIndex
}:{
  itemIndex: number
}) {
  const item = useAppSelector((state:any) => state.info.item[itemIndex] as ItemInfoType);
  const errorList = useAppSelector((state:any) => state.validation.errorItemList as Array<string>)

  function additionalDevice(event:any) {
    store.dispatch(setInitialItem())
    store.dispatch(setInitialStep())
  }

  function changeHandler(event: any) {
      const { name, value } = event.target
      store.dispatch(updateItemField({
        field: name,
        value: value
      }))
  }

  function nextStepFunction(): boolean {
    store.dispatch(setInitialValidation())
    const step = store.getState().step.step as Step.StepEnum;
    const currentItemIndex = store.getState().info.currentItemIndex as number;
    const itemInfoData = store.getState().info.item[currentItemIndex] as ItemInfoType;

    if(!IsModelValid(itemInfoData, itemInfoConfig, step))
        return false;

    return true;
  }

  const data = Object.entries(item as ItemInfoType).map(([field, value]) =>
    itemInfoConfig[field].isEditable == true && 
    <div className={styles["form-item"]} key={itemInfoConfig[field].id}>
      <label 
        htmlFor={itemInfoConfig[field].id} 
        className={`${styles["form-label"]} ${errorList.includes(field) ? styles["form-label-error"] : ''}`}
      >{ itemInfoConfig[field].label }</label>

      <input 
        id={itemInfoConfig[field].id}  
        name={itemInfoConfig[field].id} 
        type="text" 
        className={`${styles["form-text-input"]}  
                    ${errorList.includes(field) ? styles["form-text-input-error"] : ''}`}
        value={value ?? ''}
        required 
        onChange={changeHandler} 
      />
    </div>
  )

  return (
    <div>
      <div className={styles.container}>
          <Validation />
          <h1>Tell Us More About Your {item.category}</h1>
          <div className={styles.form}>
              { data }
          </div>
          <button
            className={styles.button}
            type='button'
            onClick={(event) => additionalDevice(event)}
          >
            Add Another Device
          </button>
      </div>
      <Navigation
        customNextFunction={nextStepFunction}
      />
    </div>
  )
}