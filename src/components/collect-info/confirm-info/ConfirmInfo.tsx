//Will need to refactor this later to iterate through info object {category, iteminfo, personalinfo}

import React from 'react'
import styles from './confirm-info.module.css'
import { store } from '@/redux/store'
import { useAppSelector } from '@/redux/hooks'
import { ItemKeys, itemInfoConfig } from '@/types/ItemInfo'
import { personalInfoConfig } from '@/types/PersonalInfo'
import Navigation from '../navigation/Navigation'
import { setStep } from '@/redux/slices/stepSlice'
import { StepEnum } from '@/utils/steps'
import { setCurrentItemId } from '@/redux/slices/infoSlice'

function ConfirmInfo() {
    const itemInfo = useAppSelector((state) => state.info.item)
    const personalInfo = useAppSelector((state) => state.info.personal)

    function handleEditItem(event:any) {
        const itemUId = event.target.value;
        console.log(itemUId)
        store.dispatch(setCurrentItemId(itemUId))
        store.dispatch(setStep(StepEnum.ItemInfo))
    }

    function handleEditPersonal(event:any) {
        store.dispatch(setStep(StepEnum.PersonalInfo))
    }

    const itemInfoData = Object.entries(itemInfo).map(([key, value], index) => (
        <li key={key} className={styles.box}>
            <h3>Item {index + 1}</h3>
            {Object.entries(value).map(([infoKey, infoItem]) => (
                <div key={infoKey}>
                    <p><span className={styles.bold}>{itemInfoConfig[infoKey].label}:</span> {infoItem}</p>
                </div>
            ))}
            <button
                type='button'
                className={styles["edit-button"]}
                value={key}
                onClick={(event:any) => handleEditItem(event)}
            >
                Edit
            </button>
        </li>
    ));

    const personalInfoData = Object.entries(personalInfo).map(([key, value], index) => (
        <li key={index}>
            <div>
                <p><span className={styles.bold}>{personalInfoConfig[key].label}:</span> {value}</p>
            </div>
        </li>
    ));

  return (
    <div className={styles.container}>
        <h1 className={`${styles.bold} ${styles["align-left"]}`}>Item Info:</h1>
        <ul>
            {itemInfoData}
        </ul>
        <h1 className={`${styles.bold} ${styles["align-left"]}`}>Personal Info:</h1>
        <ul className={styles.box}>
            {personalInfoData}
            <button
                type='button'
                className={styles["edit-button"]}
                onClick={(event:any) => handleEditPersonal(event)}
            >
                Edit
            </button>
        </ul>
        
        <div className={styles["align-left"]}>
            <input type="checkbox" id="checkbox" name="checkbox"/>
            <label htmlFor='checkbox'>I agree to the terms and conditions</label>
        </div>
        <Navigation displayBackStep={false}/>
    </div>
  )
}

export default ConfirmInfo