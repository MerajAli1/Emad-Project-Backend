import mongoose from "mongoose"


const connectDB = async()=>{
    try {
      const connectionInstance = await mongoose.connect("mongodb+srv://admin:admin@cluster0.45knxpu.mongodb.net/")
        console.log(`mongoDB connected !! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("mongooDB connection error..");
        process.exit(1)
    }
}
export default connectDB;