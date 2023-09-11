import React, { useEffect } from 'react'
import mongoose from 'mongoose';
import { notFound, redirect } from 'next/navigation'
import { headers } from 'next/headers'

import { connect, disconnect } from '@/utils/mongodb'
import { mapItemFormDataToItemData } from '@/utils/admin';
import InquiryData, { InquiryDataInterface } from '@/models/InquiryData';
import styles from './page.module.css'

import PersonalInfo from '@/components/admin/personal-info/PersonalInfo';
import SelectStatusSection from '@/components/admin/select-status-section/SelectStatusSection';
import ItemInvoice from '@/components/admin/item-invoice/ItemInvoice';
import { HTMLAttributes } from './attributes';
import { ObjectId } from 'mongodb';

let InquiryUId: string = ''; //global variable

export async function getInquiry(id: string): Promise<InquiryDataInterface> {
    let inquiry: InquiryDataInterface = new InquiryData()
    
    try {
        if ( !mongoose.isValidObjectId(id) )
            throw("Id is not a valid mongoose object")

        await connect();
        inquiry = await InquiryData.findById(id).exec()
        
        if ( !inquiry.ApplicationId )
            notFound()

        console.log(inquiry.ApplicationId ?? 'No Application Id Found')
        console.log("Status: " + (inquiry.StatusId ?? 'No Status Id Found'))
        console.log("Decision: " + (inquiry.DecisionId ?? 'No Decision Id Found'))
    } catch (ex) {
        console.log(ex)
    } finally {
        console.log("Trying to call mongodb disconnect")
        disconnect()
    }

    // console.log("returning inquiry in getInquiry:" + inquiry)
    return inquiry;
}

export async function inquiryAction(data: FormData) {
    "use server";
    let success = false;

    try {
        console.log(data)
        let inquiry: InquiryDataInterface = new InquiryData()

        console.log('global InquiryUId: ' + InquiryUId)
        const uIdString = InquiryUId ? InquiryUId : (data.get("inquiryUId")?.toString() ?? '')
        const uIdObject = new ObjectId(uIdString)
        console.log('uIdString: ' + uIdString)
        console.log('uIdObject: ' + uIdObject.toString())

        if (uIdString !== uIdObject.toString()) {
            throw("Id is not a valid mongoose object") 
        }

        inquiry = await getInquiry(InquiryUId)
        await connect();
        await InquiryData.updateOne({_id: inquiry._id}, {
            DecisionId: Number(data.get(HTMLAttributes.Decision)?.toString()),
            StatusId: Number(data.get(HTMLAttributes.Status)?.toString()),
            ItemData: mapItemFormDataToItemData(data, inquiry)
        }).exec()
        success = true;
    } catch (ex) {
        console.log(ex)
    } finally {
        console.log("Trying to call mongodb disconnect")
        disconnect()
    }

    const url = new URL(headers().get('referer')?.toString() ?? '')
    if(success) {
        if (url.searchParams.get("success"))
            url.searchParams.delete("success")
        console.log('redirect to: ' + url.toString())
        redirect(url.toString())
    }
    else { 
        if (!url.searchParams.get("success"))
            url.searchParams.append("success", "false")
        console.log(url.toString())
        redirect(url.toString())
    }
}

export default async function Admin({ 
    params, 
    searchParams 
}: { 
    params: {id: string },
    searchParams: any
}) {
    InquiryUId = params.id
    let inquiry = await getInquiry(InquiryUId);

    return (
        <div className={styles.container}>
            {searchParams.success == 'false' && <div className={styles['validation-container']}>An error has occured, please try again!</div>}
            <form action={inquiryAction}>
                <input type='hidden' name='inquiryUId' value={InquiryUId}/>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <h2>Application Id: {inquiry.ApplicationId}</h2>
                    </div>
                    <div className={styles.right}>
                        <button type='submit'>
                            Save
                        </button>
                    </div>
                </div>
                <SelectStatusSection 
                    StatusId={inquiry.StatusId}
                    DecisionId={inquiry.DecisionId}
                /><hr/>
                <PersonalInfo info={inquiry.PersonalData} /><hr/>
                <ItemInvoice 
                    itemsProp={JSON.stringify(inquiry.ItemData)} 
                /><hr/>
            </form>
        </div>
    )
}