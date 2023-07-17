import * as Mongoose from "mongoose";
import { StringFormat } from "@/utils/string";

let database: Mongoose.Connection;

export const connect = () => {
    const uri = StringFormat(
        process.env.DB_URL as string, 
        process.env.DB_USERNAME as string, 
        process.env.DB_PASSWORD as string
    )

    if (database) {
        return;
    }
    
    Mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as Mongoose.ConnectOptions);

    database = Mongoose.connection;
    database.once("open", async () => {
        console.log("Connected to database");
    });

    database.on("error", () => {
        console.log("Error connecting to database");
    });
};

export const disconnect = () => {
    if (!database) {
        return;
    }
    
    Mongoose.disconnect();
}