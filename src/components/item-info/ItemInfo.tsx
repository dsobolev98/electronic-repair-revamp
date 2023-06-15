import React from 'react'
import styles from './item-info.module.css'

export default function ItemInfo({
    category,
    handleItemInfo
}:{
    category: string
    handleItemInfo: any
}) {
  return (
    <div className={styles.container}>
        <h1>Tell Us More About Your {category}</h1>
        <div className={styles.form}>
            <div className={styles["form-item"]}>
                <label htmlFor="brand" className={styles["form-label"]}>Brand</label>
                <input id="brand" type="text" className={styles["form-text-input"]} required></input>
            </div>
            <div className={styles["form-item"]}>
                <label htmlFor="model" className={styles["form-label"]}>Model</label>
                <input id="model" type="text" className={styles["form-text-input"]} required></input>
            </div>
        </div>
    </div>
  )
}