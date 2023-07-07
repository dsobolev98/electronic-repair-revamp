import React from 'react'
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

function ConfirmInfo() {
    const itemInfo = useAppSelector((state:any) => state.info.item)
    const personalInfo = useAppSelector((state:any) => state.info.personal)

    function handleEditItem(event:any) {
        const itemUId = event.target.value;
        store.dispatch(setCurrentItemId(itemUId))
        store.dispatch(setStep(StepEnum.ItemInfo))
    }

    function handleRemoveItem(event:any) {
        const itemUId = event.target.value;
        store.dispatch(removeItem(itemUId))
    }

    function additionalDevice(event:any) {
        store.dispatch(setInitialItem())
        store.dispatch(setInitialStep())
    }

    function handleEditPersonal(event:any) {
        store.dispatch(setStep(StepEnum.PersonalInfo))
    }

    async function nextStepFunction(): Promise<boolean> {
        try {
            store.dispatch(setInitialValidation())
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

        return true;
    }

    const itemInfoData = Object.entries(itemInfo as ItemInfo).map(([key, value], index) => (
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
            { Object.keys(itemInfo as ItemInfo).length > 1 && 
              <button
                type='button'
                className={styles["edit-button"]}
                value={key}
                onClick={(event:any) => handleRemoveItem(event)}
              >
                Remove
              </button>
            }
        </li>
    ));

    const personalInfoData = Object.entries(personalInfo as PersonalInfo).map(([key, value], index) => (
        <li key={index}>
            <div>
                <p><span className={styles.bold}>{personalInfoConfig[key].label}:</span> {value}</p>
            </div>
        </li>
    ));

  return (
    <div>
        <div className={styles.container}>
            <Validation />
            <h1 className={`${styles.bold} ${styles["align-left"]}`}>Item Info:</h1>
            <ul className={styles["item-list"]}>
                {itemInfoData}
                <li className={styles.box}>
                    <button
                        type='button'
                        className={styles["edit-button"]}
                        onClick={(event:any) => additionalDevice(event)}
                    >
                        Add Another Item
                    </button>
                </li>
            </ul>
            <h1 className={`${styles.bold} ${styles["align-left"]}`}>Personal Info:</h1>
            <ul className={`${styles.box} ${styles["align-left"]}`}>
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
        </div>
        <Navigation 
                displayBackStep={false}
                customNextFunction={nextStepFunction}
            />
    </div>
  )
}

export default ConfirmInfo