import { store } from "@/redux/store";
import { setInitialValidation, validationState } from "@/redux/slices/validationSlice";
import { PersonalInfo, personalInfoConfig } from "@/types/PersonalInfo";
import { ItemInfo, itemInfoConfig } from "@/types/ItemInfo";
import { connect, disconnect } from "@/utils/mongodb";
import { IsModelValid } from "@/utils/validation";
import InquiryData from '@/models/InquiryData'

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
        const response = await req.json();
        const ItemData = response.ItemData as Array<ItemInfo>;
        const PersonalData = response.PersonalData as PersonalInfo;

        Validate(ItemData, PersonalData);
        SendToDB(ItemData, PersonalData);


        return NextResponse.json({ response });
    }
    catch (e) {
        if (e instanceof Error) {
            return NextResponse.json({ }, {
                status: 500,
                statusText: e.message ?? ''
            })
        }
        else {
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

async function SendToDB(ItemData: Array<ItemInfo>, PersonalData: PersonalInfo): Promise<string> {
    console.log("Sending to DB in repair api...")

    try {
        await connect();
        const result = await InquiryData.create({
            ItemData: ItemData,
            PersonalData: PersonalData
        })

        const id: string = result.id.toString()
        console.log(id)
        return id;
    }
    catch (e)
    {
        throw e;
    }
    finally {
        disconnect();
        console.log("Disconnected from DB")
    }
}