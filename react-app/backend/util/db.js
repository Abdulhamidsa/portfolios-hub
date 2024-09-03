import mongoose from "mongoose";
// export const connect = (url = process.env.MONGO_CONNECTION_STRING) => {
//   return mongoose.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   });
// };
const MONGO_CONNECTION_STRING = `mongodb+srv://aboood:UNBFqjTpLgeUMQkl@cluster0.bn3dcrh.mongodb.net/internship?retryWrites=true&w=majority `;
export const connect = (url = MONGO_CONNECTION_STRING) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};
connect();
