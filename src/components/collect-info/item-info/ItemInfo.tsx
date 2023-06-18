"use client"

import React from 'react'
import styles from './item-info.module.css'
import Navigation from '../navigation/Navigation'

import { store } from '@/redux/store'
import { useAppSelector } from '@/redux/hooks'

export default function ItemInfo() {
  const category = useAppSelector((state) => state.info.category);

  return (
    <div>
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
      <Navigation/>
    </div>
  )
}