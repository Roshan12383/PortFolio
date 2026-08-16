import mongoose from "mongoose"
const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDb Connect");
    } catch (error) {
        console.log("DB Error: ", error);
    }
}


export default connectDb;