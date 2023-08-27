import mongoose, { Types } from "mongoose";
import { 
    ItemKeys, 
    ItemInfo as ItemInfoType} from "@/types/ItemInfo"
import { 
    PersonalKeys, 
    PersonalInfo as PersonalInfoType} from "@/types/PersonalInfo"

const { Schema } = mongoose;

const inquirySchema = new Schema({
    ApplicationId: {
        type: Number,
        required: true
    },
    StatusId: {
        type: Number,
        required: true
    },
    DecisionId: {
        type: Number,
        required: true
    },
    ItemData: {
        type: Array,
        of: {
            [ItemKeys.CATEGORY]: String,
            [ItemKeys.BRAND]: String, 
            [ItemKeys.MODEL]: String,
            Part: {
                type: Array,
                of: {
                    Name: String,
                    Price: Number
                },
                required: false
            },
            Labor: {
                type: {
                    Hours: Number,
                    Price: Number
                },
                required: false
            }
        },
        required: true
    },
    PersonalData: {
        type: {
            [PersonalKeys.FIRSTNAME]: String,
            [PersonalKeys.LASTNAME]: String,
            [PersonalKeys.MIDDLENAME]: String,
            [PersonalKeys.EMAIL]: String,
            [PersonalKeys.ADDRESSLINE]: String,
            [PersonalKeys.CITY]: String,
            [PersonalKeys.STATE]: String,
            [PersonalKeys.ZIPCODE]: Number,
            [PersonalKeys.TELEPHONE]: Number
        },
        required: true
    }
}, { timestamps: true })

export interface PartType {
    Name: string,
    Price: number
}

export interface LaborType {
    Hours: number,
    Price: number
}

export interface ItemInfo extends ItemInfoType {
    _id: Types.ObjectId,
    Part: Array<PartType>
    Labor: LaborType
}

export interface PersonalInfo extends PersonalInfoType {
    _id: Types.ObjectId
}

export interface InquiryDataInterface {
    _id: Types.ObjectId,
    ApplicationId: number,
    StatusId: number,
    DecisionId: number,
    ItemData: Array<ItemInfo>,
    PersonalData: PersonalInfo,
    createdAt: Date,
    updatedAt: Date
}

export default mongoose.models.InquiryData || mongoose.model("InquiryData", inquirySchema)