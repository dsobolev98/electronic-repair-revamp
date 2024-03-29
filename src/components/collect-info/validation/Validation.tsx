import React from 'react'
import styles from './validation.module.css'
import { useAppSelector } from '@/redux/hooks'

function Validation() {
  const errorList = useAppSelector((state:any) => state.validation.errorDetailList as Array<string>)

  const errors = errorList.map((message, index) => (<li key={index}>{message}</li>))

  return (
    <div>
    { errorList.length > 0 &&
      <div className={styles.validationContainer}>
        
          <div>
            <h3>Please fix these errors:</h3>
            <ul>
                {errors}
            </ul>
          </div>
      </div>
    }
    </div>
  )
}

export default Validation