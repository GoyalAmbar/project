import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Import Routes (will create these next)
import authRoutes from './routes/auth.js';
import tourRoutes from './routes/tours.js';
import bookingRoutes from './routes/bookings.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: true, // Allow all for now, restrict in production
  credentials: true
}
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Database Connection
mongoose.set('strictQuery', false);
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB database connected successfully');
  } catch (error) {
    console.log('MongoDB connection failed:', error.message);
  }
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/api', (req, res) => {
  res.send('API is running...');
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    connectToDB();
    console.log(`Server listening on port ${port}`);
  });
}

// For Vercel Serverless
export default async function handler(req, res) {
  await connectToDB();
  return app(req, res);
}
