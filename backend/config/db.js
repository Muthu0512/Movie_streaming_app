import mongoose from "mongoose"
import { ENV_VARS } from "./envVar.js"

const MONGO_URI=ENV_VARS.MONGO_URI

const connectDB = async ()=>{

    try {
        const conn= await mongoose.connect(MONGO_URI)
        console.log("MongoDB connected :" + conn.connection.host)
    } catch (error) {
        console.log("Error connection to monogDB", error.message)
        process.exit(1)  //1 means error and 0 means success connection
    }

}
export default connectDB


