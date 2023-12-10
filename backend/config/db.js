import mongoose from 'mongoose';

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('DB connected successfully.');
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}
