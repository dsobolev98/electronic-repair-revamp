'use client'

import React, { useState } from 'react'
import styles from './item-invoice.module.css'
import { ItemInfo, PartType } from '@/models/InquiryData'
import { HTMLAttributes } from '@/app/admin/[id]/attributes'

export default function ItemInvoice({
    itemsProp
}:{
    itemsProp: string
}) {
    const [items, setItems] = useState(JSON.parse(itemsProp) as Array<ItemInfo>)

    function addPart(itemIndex: number) {
        const newPart = {
            Name: '',
            Price: 0.00
        } as PartType
        var newItems = items.slice()
        if (items[itemIndex].Part.length < 8)
            newItems[itemIndex].Part.push(newPart)
        setItems(newItems)
    }

    function deletePart(itemIndex: number, partIndex: number) {
        var newPartArray: PartType[] = []
        items[itemIndex].Part.forEach((part, index) => {
            if (partIndex != index) {
                newPartArray.push(part)
            }
        })
        var newItems = items.slice()
        newItems[itemIndex].Part = newPartArray
        setItems(newItems)
    }

    return (
        <div>
            <h3>Items: </h3>
            {
                items.map((item, itemIndex) => 
                    <div key={'item'+itemIndex}>
                        <h4>{item.brand} {item.model}</h4>
                        <div className={styles.row}>
                            <div className={styles.left}>
                                <p>Parts:</p>
                            </div>
                            <div className={styles.right}>
                                {
                                    item.Part.map((part, partIndex) => 
                                        <div key={'part'+partIndex} className={styles.row}>
                                            <label> &nbsp; Part Name: &nbsp; </label>
                                            <input 
                                                defaultValue={ part.Name?.toString() ?? '' }
                                                readOnly={part.Name ? true : false }
                                                name={itemIndex + HTMLAttributes.PartName + partIndex}
                                            />
                                            <label> &nbsp; Price: &nbsp; </label>
                                            <input 
                                                defaultValue={ part.Price > 0 ? part.Price.toString() : '' }
                                                readOnly={part.Price > 0 ? true : false }
                                                name={itemIndex + HTMLAttributes.PartPrice + partIndex}
                                            />
                                            <button 
                                                type='button' 
                                                onClick={(event: any) => deletePart(itemIndex, partIndex)}
                                                disabled={item.Part.length > 1 ? false : true}
                                            > Delete </button>
                                        </div>
                                    )
                                }
                                <div className={`${styles.row}`}>
                                    <div className={styles.right}>
                                    <button 
                                        type='button' 
                                        onClick={(event:any) => addPart(itemIndex)}
                                        disabled={(item?.Part?.length ?? 0) < 8 ? false : true}
                                    > Add Part </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.left}>
                                <p>Labor:</p>
                            </div>
                            <div className={styles.right}>
                                <label>Hour(s):</label>
                                <input 
                                    defaultValue={item?.Labor?.Hours.toString() ?? '0'}
                                    name={itemIndex + HTMLAttributes.LaborHours}
                                />

                                <label>Price:</label>
                                <input 
                                    defaultValue={item?.Labor?.Price.toString() ?? '0.00'} 
                                    name={itemIndex + HTMLAttributes.LaborPrice}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}