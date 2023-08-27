"use server"

import React from 'react'
import styles from './select-status-section.module.css'
import StatusData from '@/utils/status/status.json'
import DecisionData from '@/utils/status/decision.json'
import {HTMLAttributes} from '@/app/admin/[id]/attributes'

export default async function SelectStatusSection({
    DecisionId,
    StatusId
}:{
    DecisionId: number,
    StatusId: number
}) {
  return (
    <div>
        <div className={`${styles.row} ${styles["status-dropdown-section"]}`}>
            <div className={styles.left}>
                <label htmlFor={HTMLAttributes.Decision}><h3>Decision: </h3></label><br/>
                <select 
                    id={HTMLAttributes.Decision} 
                    className={styles.dropdown} 
                    name={HTMLAttributes.Decision}
                    defaultValue={DecisionId.toString()}
                >
                    {Object.entries(DecisionData).map(([key, {Title}]) =>
                        <option key={key} value={key}>{Title}</option>
                    )}
                </select>
            </div>
            <div className={styles.right}>
                <label htmlFor={HTMLAttributes.Status}><h3>Status: </h3></label><br/>
                <select 
                    id={HTMLAttributes.Status} 
                    className={styles.dropdown} 
                    name={HTMLAttributes.Status}
                    defaultValue={StatusId.toString()}
                >
                    {Object.entries(StatusData).map(([key, {Title}]) =>
                        <option key={key} value={key}>{Title}</option>
                    )}
                </select>
            </div>
        </div>
    </div>
  )
}
