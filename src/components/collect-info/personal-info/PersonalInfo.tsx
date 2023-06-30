import styles from './personal-info.module.css'
import Navigation from '../navigation/Navigation'
import { PersonalInfo, personalInfoConfig } from '@/types/PersonalInfo'
import { store } from '@/redux/store'
import { updatePersonalField } from '@/redux/slices/infoSlice'
import { useAppSelector } from '@/redux/hooks'
import Validation from '../validation/Validation'

export default function PersonalInfo() {
    const personal = useAppSelector((state) => state.info.personal as PersonalInfo);
    const errorList = useAppSelector((state:any) => state.validation.errorItemList as Array<string>)

    function changeHandler(event: any) {
        const { name, value } = event.target
        store.dispatch(updatePersonalField({
          field: name,
          value: value
        }))
    }

    const data = Object.entries(personal).map(([field, value]) => personalInfoConfig[field].isEditable == true && 
        <div className={styles["form-item"]} key={personalInfoConfig[field].id}>
        <label 
            htmlFor={personalInfoConfig[field].id} 
            className={`${styles["form-label"]} ${errorList.includes(field) ? styles["form-label-error"] : ''}`}
        >
            {personalInfoConfig[field].label}
        </label>
        <input 
            id={personalInfoConfig[field].id}  
            name={personalInfoConfig[field].id} 
            type="text" 
            className={`${styles["form-text-input"]}  ${errorList.includes(field) ? styles["form-text-input-error"] : ''}`}
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
            <h1>Tell Us More About Your Yourself</h1>
            <div className={styles.form}>
                {data}
            </div>
        </div>
        <Navigation
            validate={true}
        />
    </div>
  )
}