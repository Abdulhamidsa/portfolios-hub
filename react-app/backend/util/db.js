import mongoose from 'mongoose'
const MONGO_CONNECTION_STRING =
    'mongodb+srv://aboood:UNBFqjTpLgeUMQkl@cluster0.bn3dcrh.mongodb.net/internship?retryWrites=true'

export const connect = (url = MONGO_CONNECTION_STRING) => {
    return mongoose.connect(url)
}
