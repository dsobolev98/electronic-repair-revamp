import styles from './personal-info.module.css'
import Navigation from '../navigation/Navigation'
import { personalInfoConfig } from '@/types/PersonalInfo'
import { store } from '@/redux/store'
import { updatePersonalField } from '@/redux/slices/infoSlice'

export default function PersonalInfo() {

    function changeHandler(event: any) {
        const { name, value } = event.target
        store.dispatch(updatePersonalField({
          field: name,
          value: value
        }))
    }

    const data = Object.entries(personalInfoConfig).map(([field, config]) => config.isEditable == true && 
        <div className={styles["form-item"]} key={config.id}>
        <label htmlFor={config.id} className={styles["form-label"]}>{config.label}</label>
        <input 
            id={config.id}  
            name={config.id} 
            type="text" 
            className={styles["form-text-input"]} 
            required 
            onChange={changeHandler} 
        />
        </div>
    )

  return (
    <div>
        <div className={styles.container}>
            <h1>Tell Us More About Your Yourself</h1>
            <div className={styles.form}>
                {data}
            </div>
        </div>
        <Navigation/>
    </div>
  )
}