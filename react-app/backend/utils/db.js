import mongoose from 'mongoose'
export const connect = async (url = process.env.MONGO_CONNECTION_STRING) => {
    try {
        await mongoose.connect(url)
        console.log('Connected to MongoDB')
    } catch (e) {
        console.error('Failed to connect to MongoDB', e)
    }
}
