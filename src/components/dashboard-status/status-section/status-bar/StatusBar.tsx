'use server'

import React from 'react'
import styles from './status-bar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faArrowPointer, 
  faQuestion,
  faShippingFast, 
  faMagnifyingGlass, 
  faScrewdriverWrench, 
  faBox } from '@fortawesome/free-solid-svg-icons'
import StatusData from '@/utils/status/status.json'

function StatusBar({
  StatusId
}:{
  StatusId: number
}) {
  const Icons = { 
    'faArrowPointer': faArrowPointer,
    'faQuestion': faQuestion,
    'faShippingFast': faShippingFast,
    'faMagnifyingGlass': faMagnifyingGlass,
    'faScrewdriverWrench': faScrewdriverWrench,
    'faBox': faBox
  }

  const StyleBase: object = {
    color: '#2c6fbb', 
    height: '24px'
  }

  const StyleCurrent: object = {
    color: 'green', 
    height: '24px'
  }

  const StatusIdString: string = StatusId.toString()
  const LastIndexOfStatusData: number = Object.keys(StatusData).length
  const StatusItems = Object.entries(StatusData).map(([key, {Title, Icon}], index) => (
    <div key={index} className={styles["icon-container"]}>
      <div className={` 
            ${styles.icon} 
            ${StatusId >= Number(key) ? 
              StatusIdString == key ? styles.current : styles.completed :
              styles.uncompleted}
          `}>
        
        <FontAwesomeIcon 
          icon={ Icons[Icon as keyof typeof Icons] } 
          style={ StatusIdString == key ? StyleCurrent : StyleBase } 
        />
      </div>
      {(index + 1) < LastIndexOfStatusData && <hr/>}
    </div>
  ))


  return (
    <div className={styles.container}>
        {StatusItems}
    </div>
  )
}

export default StatusBar