import ItemInfo from "@/components/collect-info/item-info/ItemInfo";
import { setInitialItem } from "@/redux/slices/infoSlice";
import { setInitialValidation, validationState } from "@/redux/slices/validationSlice";
import { store } from "@/redux/store";
import { ItemDictionary, itemInfoConfig } from "@/types/ItemInfo";
import { PersonalInfo, personalInfoConfig } from "@/types/PersonalInfo";
import { IsModelValid } from "@/utils/validation";
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
            brand: "select * from table",
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
        state: "state",
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
    const response = await req.json();
    const ItemData = response.ItemData as ItemDictionary;
    const PersonalData = response.PersonalData as PersonalInfo;

    console.log(ItemData);
    console.log(PersonalData);

    store.dispatch(setInitialValidation())
    Object.entries(ItemData).forEach(([itemUId, itemInfo]) => IsModelValid(itemInfo, itemInfoConfig))
    IsModelValid(PersonalData, personalInfoConfig)

    const validation = store.getState().validation as validationState
    if (validation.errorDetailList.length > 0) {
        return NextResponse.json({ errors: validation.errorDetailList }, {
            status: 500,
            statusText: "request is invalid"
        })
    }

    return NextResponse.json({ response });
}