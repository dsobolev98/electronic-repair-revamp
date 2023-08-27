import mongoose, { Types } from "mongoose";

const { Schema } = mongoose;

const quoteSchema = new Schema({
    ApplicationId: {
        type: Number,
        required: true
    }
}, { timestamps: true })

export interface QuoteDataInterface {
    _id: Types.ObjectId,
    ApplicationId: number,
    createdAt: Date,
    updatedAt: Date
}

export default mongoose.models.QuoteData || mongoose.model("QuoteData", quoteSchema)