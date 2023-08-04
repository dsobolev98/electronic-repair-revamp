import { ItemInfo } from '@/types/ItemInfo'
import React from 'react'
import styles from './item-invoice.module.css'
import { Double } from 'mongodb'

function ItemInvoice({
    Items
}:{ 
    Items: Array<ItemInfo>
}) {

    const numberOfItems = Items.length
    let subTotalPrice: number = 0
       Items.forEach((item) => subTotalPrice +=  0.00)
    let tax: number = subTotalPrice * 0.08875
    let totalPrice: number = subTotalPrice * 1.08875

    return (
        <div className={styles.container}>
            {
                Items.map((item, index) => 
                    <div key={index}>
                        <h4>{item.brand} {item.model}</h4>
                        <div className={styles.row}> 
                            <div className={styles.left}>
                                <p>Parts:</p>
                            </div>
                            <div className={styles.right}>
                                <p>$-.--</p>
                            </div>
                        </div>

                        <div className={styles.row}> 
                            <div className={styles.left}>
                                <p>Labor:</p>
                            </div>
                            <div className={styles.right}>
                                <p>$-.--</p>
                            </div>
                        </div>
                        {/* {   (index + 1) < numberOfItems &&
                            <hr 
                                className={styles.line} 
                            />
                        }    */}
                        <hr className={styles.line} />
                    </div>
                )
            }
            <div className={styles.row}>
                <div className={styles.left}>
                    <h3>Total</h3>
                </div>
                <div className={styles.right}>
                    <p>Subtotal: ${ subTotalPrice > 0 ? subTotalPrice : '-.--' }</p>
                    <p>Tax (8.875%): ${ tax > 0 ? tax : '-.--' }</p>
                    <p>Total: ${ totalPrice > 0 ? totalPrice : '-.--' }</p>
                </div>
            </div> 
        </div>
    )
}

export default ItemInvoice