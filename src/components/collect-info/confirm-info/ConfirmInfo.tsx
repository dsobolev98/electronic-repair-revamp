import React, { useState } from 'react'
import styles from './confirm-info.module.css'
import { store } from '@/redux/store'
import { useAppSelector } from '@/redux/hooks'
import { ItemDictionary, ItemInfo, ItemKeys, itemInfoConfig } from '@/types/ItemInfo'
import { PersonalInfo, personalInfoConfig } from '@/types/PersonalInfo'
import Navigation from '../navigation/Navigation'
import { setInitialStep, setStep } from '@/redux/slices/stepSlice'
import { StepEnum } from '@/utils/steps'
import { removeItem, setCurrentItemId, setInitialItem } from '@/redux/slices/infoSlice'
import { addErrorDetail, setInitialValidation } from '@/redux/slices/validationSlice'
import Validation from '../validation/Validation'
import $ from 'jquery'

function ConfirmInfo() {
    const itemInfo = useAppSelector((state:any) => state.info.item)
    const personalInfo = useAppSelector((state:any) => state.info.personal)
    const [termsAgreement, setTermsAgreement] = useState(false);

    // -----------------------------------------------
    // onClick Functions
    // -----------------------------------------------
    function handleEditItem(event:any) {
        const itemUId = event.target.value;
        store.dispatch(setInitialValidation())
        store.dispatch(setCurrentItemId(itemUId))
        store.dispatch(setStep(StepEnum.ItemInfo))
    }

    function handleRemoveItem(event:any) {
        const itemUId = event.target.value;
        store.dispatch(removeItem(itemUId))
    }

    function additionalDevice(event:any) {
        store.dispatch(setInitialValidation())
        store.dispatch(setInitialItem())
        store.dispatch(setInitialStep())
    }

    function handleEditPersonal(event:any) {
        store.dispatch(setInitialValidation())
        store.dispatch(setStep(StepEnum.PersonalInfo))
    }

    async function nextStepFunction(): Promise<boolean> {
        try {
            store.dispatch(setInitialValidation())
            $("#button-navigation-next").prop("disabled", true)
            $("#button-navigation-next").addClass(styles["button-disabled"])

            if (!termsAgreement) {
                store.dispatch(addErrorDetail("Please accept terms and conditions"))
                return false;
            }

            const itemInfoData = store.getState().info.item as ItemDictionary;
            const personalInfoData = store.getState().info.personal as PersonalInfo;

            const response = await fetch('api/repair', {
                method: 'POST',
                cache: 'no-store',
                body: JSON.stringify({
                    ItemData: itemInfoData, 
                    PersonalData: personalInfoData
                })
            })

            if (!response.ok)
                throw("reponse not in 200");

            let cleanRes = await response.json();
            console.log(cleanRes);
        }
        catch (ex) {
            store.dispatch(addErrorDetail("There seems to be an error, please try again"))
            return false;
        }
        finally {
            $("#button-navigation-next").prop("disabled", false)
            $("#button-navigation-next").removeClass(styles["button-disabled"])
        }

        return true;
    }

    // -----------------------------------------------
    // Mapping Functions
    // -----------------------------------------------
    const itemInfoData = Object.entries(itemInfo as ItemInfo).map(([key, value], index) => (
        <div key={key} className={styles.card}>
            <div className={styles["text-container-item"]}>
                <h3>Item {index + 1}</h3>
                {Object.entries(value).map(([infoKey, infoItem]) => (
                    <div key={infoKey}>
                        <span className={styles.bold}>{itemInfoConfig[infoKey].label}:</span> {infoItem}
                    </div>
                ))}
            </div>

            { Object.keys(itemInfo as ItemInfo).length > 1 && 
            <button
                type='button'
                className={styles["button-remove"]}
                value={key}
                onClick={(event:any) => handleRemoveItem(event)}
            > Remove </button> }

            <button
                type='button'
                className={styles["button-edit-item"]}
                value={key}
                onClick={(event:any) => handleEditItem(event)}
            > Edit </button>
        </div>
    ))

    const personalInfoData = Object.entries(personalInfo as PersonalInfo).map(([key, value], index) => (
        <div key={index}>
            <span className={styles.bold}>{personalInfoConfig[key].label}:</span> {value}
        </div>
    ));

  return (
    <div>
        <div className={styles.container}>
            <Validation />

            <h1 className={`${styles.bold} ${styles["section-title"]}`}>Items Information:</h1>
            <div className={styles["scrolling-wrapper"]}>
                {itemInfoData}
                <button
                    type='button'
                    className={`${styles.card} ${styles["button-add"]}`}
                    onClick={(event) => additionalDevice(event)}
                > + </button>
            </div>

            <h1 className={`${styles.bold} ${styles["section-title"]}`}>Personal Information:</h1>
            <div className={styles["container-personal"]}>
                {personalInfoData}
                <button
                    type='button'
                    className={styles["button-edit-personal"]}
                    onClick={(event:any) => handleEditPersonal(event)}
                >
                    Edit
                </button>
            </div>
            
            <h1 className={`${styles.bold} ${styles["section-title"]}`}>Agreements:</h1>
            <div className={styles["agreement-container"]}>
                <input type="checkbox" id="terms-conditions" name="terms-conditions" 
                    onClick={(event) => {
                        console.log(event.currentTarget.checked)
                        setTermsAgreement(event.currentTarget.checked)
                    }}/>
                <label htmlFor='terms-conditions'>&nbsp;I agree to the terms and conditions</label>
            </div> 
        </div>
        <Navigation 
            displayBackStep={false}
            customNextFunction={nextStepFunction}
        />
    </div>
  )
}

export default ConfirmInfo