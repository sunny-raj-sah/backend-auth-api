import mongoose from 'mongoose';


export const connectDB = async () => {
const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('MONGODB_URI is missing');
mongoose.set('strictQuery', true);
await mongoose.connect(uri, { autoIndex: true });
console.log('✅ MongoDB connected');
};