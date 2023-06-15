'use client'

import React from 'react'
import styles from './category.module.css'
import CategoryInfo from './data.json'
import { AppProps } from 'next/app';

export default function Category({
    handleCategory
  }:{
    handleCategory: any
  }) {

  const data = CategoryInfo.Category;
  
  let categories = data.map((item) => 
    <button 
      className={styles.button} 
      key={item.id} 
      onClick={(event:any) => handleCategory(event)}
      value={item.Name}
    >
      {item.Name}
    </button>
  );

  return (
    <div className={styles.container}>
      <h1>What type of device do you have?</h1>
       {categories}
    </div>
  )
}
