import mongoose from "mongoose";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnection = {
    isConnected: 0,
}

export const connectDB = async () => {
    const mongo_url = process.env.MONGODB_URL || 'mongodb://localhost:27017/teslodb'



    if (mongoose.connections.length > 0) {
        mongoConnection.isConnected = mongoose.connections[0].readyState
        if (mongoConnection.isConnected === 1) {
            console.log("Using previous connection")
            return;
        }

        await mongoose.disconnect()
    }

    if (mongoConnection.isConnected) {
        console.log("Is connected to DB")
        return;
    }

    try {
        await mongoose.connect(mongo_url)
        mongoConnection.isConnected = 1;
    } catch (error) {
        return console.log("Error to connect whit db")
    }



}

export const disconnectDB = async () => {

    if (process.env.NODE_ENV === 'production') return;

    if (mongoConnection.isConnected === 0) return;


    await mongoose.disconnect()
    mongoConnection.isConnected = 0;
    console.log("Is not connected to DB")


}