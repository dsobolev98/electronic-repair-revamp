import { ItemInfo } from '@/models/InquiryData'
import React from 'react'
import styles from './item-invoice.module.css'
import { Double } from 'mongodb'
import { MoneyFormat } from '@/utils/string'

function ItemInvoice({
    Items
}:{ 
    Items: Array<ItemInfo>
}) {

    const numberOfItems = Items.length
    let subTotalPrice: number = 0.00
    Items.forEach((item) => {
        let totalPartsPrice: number = 0.00
        item.Part.forEach((part) => totalPartsPrice += (part?.Price ?? 0.00))
        subTotalPrice += ((item.Labor?.Price ?? 0.00) + totalPartsPrice)
    })
    let tax: number = subTotalPrice * 0.08875
    let totalPrice: number = subTotalPrice * 1.08875

    return (
        <div className={styles.container}>
            {Items.map((item, index) => 
                <div key={index}>
                    <h3>{item.brand} {item.model}</h3>
                    <h4>Parts:</h4>
                    { item.Part.length > 0 ? item.Part.map((part, index) =>
                        <div key={index} className={styles.row}>
                            <div className={styles.left}>
                                { part.Name === '' ? 'Unavailable' : part.Name}
                            </div>
                            <div className={styles.right}>
                                { (part?.Price ?? 0) > 0 ? MoneyFormat(part.Price) : '$-.--'}
                            </div>
                        </div>
                    ) : <div className={styles.right}><p>$-.--</p></div>}
                    <div className={styles.row}>
                        <h4>Labor:</h4>
                        <div className={styles.right}>
                            <p>{ (item.Labor?.Price ?? 0) > 0 ? MoneyFormat(item.Labor.Price) : '$-.--' }</p>
                        </div>
                    </div>
                    <hr className={styles.line} />
                </div>
            )}
            <div className={styles.row}>
                <h3>Total</h3>
                <div className={styles.right}>
                    <div className={styles.row}>
                        <p className={styles.left}>Subtotal:</p> 
                        <p className={styles.right}>{ subTotalPrice > 0 ? MoneyFormat(subTotalPrice) : ' $-.--' }</p>
                    </div>
                    <div className={styles.row}>
                        <p className={styles.left}>Tax (8.875%): &nbsp;</p> 
                        <p className={styles.right}>{ tax > 0 ? MoneyFormat(tax) : ' $-.--' }</p>
                    </div>
                    <div className={styles.row}>
                        <p className={styles.left}>Total:</p> 
                        <p className={styles.right}>{ totalPrice > 0 ? MoneyFormat(totalPrice) : ' $-.--' }</p>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default ItemInvoice