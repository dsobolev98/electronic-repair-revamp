import { store } from "@/redux/store";
import { setInitialValidation, validationState } from "@/redux/slices/validationSlice";
import { PersonalInfo, personalInfoConfig } from "@/types/PersonalInfo";
import { ItemInfo, itemInfoConfig } from "@/types/ItemInfo";
import { connect, disconnect, getNextSequence } from "@/utils/mongodb";
import { IsModelValid } from "@/utils/validation";
import InquiryData, { InquiryDataInterface } from '@/models/InquiryData'

import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    //return NextResponse.json("success")

    const itemInfoData: Array<ItemInfo> = [{
            category: "Computer",
            brand: "Dell",
            model: "Latitude"
        }, {
            category: "Drone",
            brand: "DJI",
            model: "Mavic"
        }
    ]

    const personalInfoData: PersonalInfo = {
        firstname: "FirstName",
        lastname: "LastName",
        middlename: "middle",
        email: "test@email.com",
        addressline: "123 main st",
        city: "main city",
        state: "NY",
        zipcode: 12345,
        telephone: 1231231234
    }

    try {
        const rawResponse = await fetch(
            'http:/localhost:3000/api/repair', {
            method: 'POST',
            //cache: 'no-store',
            body: JSON.stringify({
                ItemData: itemInfoData, 
                PersonalData: personalInfoData
            })
        })

        if(!rawResponse.ok)
            throw("response not in 200 status")

        const response = await rawResponse.json()
        return NextResponse.json({ response })

    } catch(error) { 
        return NextResponse.json({'error': error}, {
            status: 500,
            statusText: 'error'
        })
    }
}

export async function POST(req: NextRequest) {
    try {
        const request = await req.json();
        const ItemData = request.ItemData as Array<ItemInfo>;
        const PersonalData = request.PersonalData as PersonalInfo;

        Validate(ItemData, PersonalData);
        let inqiury = await SendToDB(ItemData, PersonalData);
        //Do something in-between. ex: email, get api quote
        //let statusId = await SendStatusToDB()

        const response = {
            ApplicationUId: inqiury._id,
            StatusId: inqiury.StatusId,
            ItemData: ItemData,
            PersonalData: PersonalData
        }

        console.log("Preparing to send response back from repair api")
        return NextResponse.json({ response });
    }
    catch (e) {
        if (e instanceof Error) {
            console.log("Error instance, sending status 500 from post repair api")
            console.log("Error: " + e.message)
            return NextResponse.json({ }, {
                status: 500,
                statusText: e.message ?? ''
            })
        }
        else {
            console.log("Other exception instance, throwing ex from post repair api")
            throw e;
        }
    }
}

function Validate(ItemData: Array<ItemInfo>, PersonalData: PersonalInfo) {
    console.log("Performing validation in repair api...")
    store.dispatch(setInitialValidation())

    //Perform validation on models
    ItemData.forEach(function(item: ItemInfo) { IsModelValid(item, itemInfoConfig) });
    IsModelValid(PersonalData, personalInfoConfig)

    const validation = store.getState().validation as validationState

    if (validation.errorDetailList.length > 0) {
        console.log(validation.errorItemList);
        console.log("Validation failed")
        store.dispatch(setInitialValidation())
        throw new Error("Validation Failed");
    }

    console.log("Validation passed")
}

async function SendToDB(ItemData: Array<ItemInfo>, PersonalData: PersonalInfo): Promise<InquiryDataInterface> {
    console.log("Sending to DB in repair api...")

    try {
        await connect();

        const inquiryData = new InquiryData({
            ApplicationId: await getNextSequence('application'),
            StatusId: 100,
            DecisionId: 100,
            ItemData: ItemData,
            PersonalData: PersonalData
        })

        const result: InquiryDataInterface = await inquiryData.save();
        console.log(result._id.toString())
        return result;
    }
    catch (e) {
        console.log("exception in SendToDB function in repair api")
        console.log(e)
        throw e;
    }
    finally {
        console.log("Trying to call mongodb disconnect")
        disconnect();
    }
}