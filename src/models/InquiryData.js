import mongoose from "mongoose";
import { ItemKeys } from "@/types/ItemInfo"
import { PersonalKeys, PersonalInfo} from "@/types/PersonalInfo"

const { Schema } = mongoose;

const inquirySchema = new Schema({
    ItemData: {
        type: Array,
        of: {
            [ItemKeys.CATEGORY]: String,
            [ItemKeys.BRAND]: String, 
            [ItemKeys.MODEL]: String
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

export default mongoose.models.InquiryData || mongoose.model("InquiryData", inquirySchema)