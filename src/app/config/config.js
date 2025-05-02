import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection?.readyState === 1) {
    return true; // Already connected
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
    return true;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    return false;
  }
};

export default connectDB;
