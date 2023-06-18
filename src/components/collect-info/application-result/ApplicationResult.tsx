import React from 'react'
import styles from './application-result.module.css'

function ApplicationResult() {
  return (
    <div className={styles.container}>
        <h1>Your Application Result:</h1>
        <br/>
        <h3><span>Our Offer: </span>$0.99*</h3>
        <br/><br/>
        <p>
            You will recieve an email with all the additional information we need.
            This might include picutres and additional details about your device. 
            To access the details portal please click <span>here</span>
        </p>
        <br/>
        <p>
            * this amount is subject to change based on actual condition of the item 
            and market value
        </p>
    </div>
  )
}

export default ApplicationResult