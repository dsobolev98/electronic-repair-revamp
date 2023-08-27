import * as Mongoose from "mongoose";
import { StringFormat } from "@/utils/string";
import Counter from "@/models/Counter"
import InquiryData from "@/models/InquiryData";

let database: Mongoose.Connection;
let isConnected: Mongoose.ConnectionStates

export const connect = async () => {
    const uri = StringFormat(
        process.env.DB_URL as string, 
        process.env.DB_USERNAME as string, 
        process.env.DB_PASSWORD as string
    )

    if (database && database.readyState === 1) {
        return;
    }

    if (Mongoose.connections.length > 0) {
        console.log('There are multiple connections to the db - Connections:' + Mongoose.connections.length)
        isConnected = Mongoose.connections[0].readyState;
        if (isConnected === 1) {
            console.log('Use previous connected connection');
            return;
        }
        await disconnect();
    }
    
    try {
        await Mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as Mongoose.ConnectOptions);

        database = Mongoose.connection
        isConnected = Mongoose.connection.readyState;
    }
    catch (e) {
        console.log(e)
        throw e; //OR we can retry
    }

    // database.on('error', err => {
    //     console.log(err);
    // })

    database.on('disconnected', mes => {
        database.removeAllListeners();
        console.log('database disconnected')
    })
};

export const disconnect = () => {
    if (!database) {
        return;
    }
    
    Mongoose.disconnect();
}

export async function getNextSequence(modelName: string): Promise<number> {
    try {
        let defaultValue: number
        let defaultModel: any
        let defaultArgument: any

        switch (modelName) {
            case 'application': {
                if (!process.env.APPLICATION_START_ID)
                    throw("APPLICATION_START_IDis undefined in env file")
                defaultValue = parseInt(process.env.APPLICATION_START_ID)
                defaultModel = InquiryData
                defaultArgument = '{"ApplicationId": {0}}'
                break;
            }
            default: {
                throw(`${modelName} is not a valid counter model`)
            }
        }

        await Counter.findOneAndUpdate({ _id: modelName },{ $setOnInsert: { seq: defaultValue }},{ upsert: true })
        const counter = await Counter.findOneAndUpdate({ _id: modelName },{ $inc: { seq: 1 } },{ new: true })

        let arugment = JSON.parse(StringFormat(defaultArgument, counter.seq))
        const application = await defaultModel.findOne(arugment).exec()

        // application already exists, call recursively to increase the seq
        if(application?.id)
            return getNextSequence(modelName)
        else
            return counter.seq
    } 
    catch (e) {
        throw e;
    }
}