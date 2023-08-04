import React from 'react'
import styles from './application-result.module.css'
import { useAppSelector } from '@/redux/hooks'
import Data from '@/utils/status/decision.json'

function ApplicationResult() {
  const ApplicationUId = useAppSelector((state: any) => state.info.applicationUId as string)
  const StatusId = useAppSelector((state:any) => state.info.statusId as string)

  return (
    <div className={styles.container}>
      <h1>Your Application Result: </h1>
      <br/>
      <h3>
        <span>Our Offer: </span>
        { StatusId == "100" && <span>$-.--</span> }
        { StatusId == "110" && <span>$0.00</span> }
        { ["120", "130"].includes(StatusId) && <span>$-.--</span> }
      </h3>
      <br/><br/>
      <p>
        { 
          StatusId  
            ? Data.Decision[StatusId as keyof typeof Data.Decision].Description 
              : Data.Decision["100"].Description 
        }
      </p>
      <br/>
      { //Status cannot be declined
        !["110"].includes(StatusId) &&
        <div>
          <p>
            You will receive an email with all the additional information we need.
            This might include pictures and additional details about your device. 
            To access the details portal, please click&nbsp;
            <span> 
              <a href={`dashboard/status/${ApplicationUId}`} className={styles.link}>here</a>
            </span>
          </p>
          <br/>
          <p className={styles.subtext}>
            * Please note that this preliminary amount is provisional and is liable to be 
            modified contingent on the actual physical state of 
            the item in question and its prevailing market value.
          </p>
        </div>
      }
    </div>
  )
}

export default ApplicationResult