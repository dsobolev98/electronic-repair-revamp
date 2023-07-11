import { store } from "@/redux/store";
import { setInitialValidation, validationState } from "@/redux/slices/validationSlice";

import { ItemDictionary, itemInfoConfig } from "@/types/ItemInfo";
import { PersonalInfo, personalInfoConfig } from "@/types/PersonalInfo";

import { connect, disconnect } from "@/utils/mongodb";
import { IsModelValid } from "@/utils/validation";

import * as Mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    //return NextResponse.json("success")

    const itemInfoData: ItemDictionary = {
        ["2d71fe73-10b0-449c-b308-d4b8b241ec30"]: {
            category: "phone",
            brand: "apple",
            model: "12 pro"
        },
        ["2d71fe73-10b0-449c-b308-d4b8b241ec31"]: {
            category: "computer",
            brand: "select from table",
            model: "1250"
        }
    }

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
        const ItemData = response.ItemData as ItemDictionary;
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

function Validate(ItemData: ItemDictionary, PersonalData: PersonalInfo) {
    console.log("Performing validation in repair api...")
    store.dispatch(setInitialValidation())

    //Perform validation on models
    Object.entries(ItemData).forEach(([itemUId, itemInfo]) => 
        IsModelValid(itemInfo, itemInfoConfig))
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

async function SendToDB(ItemData: ItemDictionary, PersonalData: PersonalInfo): Promise<string> {
    console.log("Sending to DB in repair api...")

    try {
        await connect();
        const client = Mongoose.connection.getClient();
        const database = client.db("testDB");
        const collection = database.collection("testCol");
        const result = await collection.insertOne({
            ItemData: ItemData,
            PersonalData: PersonalData
        })

        const id: string = result.insertedId.toString()
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