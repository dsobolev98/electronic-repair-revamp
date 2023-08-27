"use server"

import { ItemInfo } from '@/models/InquiryData'
import React from 'react'
import styles from './item-invoice.module.css'
import {HTMLAttributes} from '@/app/admin/[id]/attributes'

async function ItemInvoice({
    items
}:{
    items: Array<ItemInfo>
}) {
  return (
    <div>
        <h3>Items: </h3>
        {
            items.map((item, index) => 
                <div key={index}>
                    <h4>{item.brand} {item.model}</h4>
                    <div className={styles.row}>
                        <div className={styles.left}>
                            <p>Parts:</p>
                        </div>
                        <div className={styles.right}>
                            <input 
                                placeholder={item.Part[0]?.Price?.toString() ?? '0.00'} 
                                name={index + HTMLAttributes.PartPrice + '0'} 
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.left}>
                            <p>Labor:</p>
                        </div>
                        <div className={styles.right}>
                            <input 
                                placeholder={item?.Labor?.Price.toString() ?? '0.00'} 
                                name={index + HTMLAttributes.LaborPrice}
                            />
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ItemInvoice