import mongoose from 'mongoose'
const MONGO_CONNECTION_STRING =
    process.env.MONGO_CONNECTION_STRING ||
    'mongodb+srv://aboood:UNBFqjTpLgeUMQkl@cluster0.bn3dcrh.mongodb.net/internship?retryWrites=true'
export const connect = async (url = MONGO_CONNECTION_STRING) => {
    try {
        await mongoose.connect(url)
        console.log('Connected to MongoDB')
    } catch (e) {
        console.error('Failed to connect to MongoDB', e)
    }
}
