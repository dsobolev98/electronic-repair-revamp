'use server'

import InquiryData, { InquiryDataInterface } from '@/models/InquiryData';
import { connect, disconnect } from '@/utils/mongodb'
import styles from './page.module.css'
import React from 'react'
import StatusBar from '@/components/dashboard-status/status-section/status-bar/StatusBar';
import StatusDetail from '@/components/dashboard-status/status-section/status-detail/StatusDetail';
import ItemInvoice from '@/components/dashboard-status/status-section/item-invoice/ItemInvoice';
import mongoose from 'mongoose';

async function Status({ params }: { params: {id: string }}) {
    let inquiryInfo: InquiryDataInterface | null | undefined

    try {
        if(!mongoose.isValidObjectId(params.id))
            throw("Id is not a valid mongoose object")

        await connect();
        inquiryInfo = await InquiryData.findById(params.id).exec()
        console.log(inquiryInfo?.ApplicationId ?? 'No Application Id Found')
        console.log(inquiryInfo?.StatusId ?? 'No Status Id Found')
    }
    catch (ex) {
        console.log(ex)
    }
    finally {
        console.log("Trying to call mongodb disconnect")
        disconnect()
    }

    if (!inquiryInfo?.ApplicationId) {
        console.log(inquiryInfo?.ApplicationId ?? 'not found')
        throw("Application Id not found")
    }


    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Application Id: {inquiryInfo.ApplicationId}</h2>
            <StatusBar 
                StatusId={inquiryInfo.DecisionId}
            />
            <StatusDetail 
                DecisionId={inquiryInfo.DecisionId} 
                StatusId={inquiryInfo.StatusId}
            />
            <ItemInvoice 
                Items={inquiryInfo.ItemData}    
            />
        </div>
    )
}

export default Status