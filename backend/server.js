import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Form Schema
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  projectType: String,
  description: String,
  budget: String,
  timeline: String,
  createdAt: { type: Date, default: Date.now }
});

const Form = mongoose.model('Form', formSchema);

// API Routes
app.post('/api/submit-form', async (req, res) => {
  try {
    const formData = new Form(req.body);
    await formData.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error saving form:', error);
    res.status(500).json({ error: 'Error submitting form' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});