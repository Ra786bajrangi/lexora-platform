require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
const path = require('path');
const adminRoutes = require('./routes/admin'); 
const userRoutes = require('./routes/users')





const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  'https://lexora-platform.vercel.app'
];
// Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.options('*', cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Serve uploaded images with CORS headers
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res) => {
    res.set('Access-Control-Allow-Origin', '*');
  }
}));
//user routes
app.use('/api/users', userRoutes);


// ✅ Add this line for admin routes
app.use('/api/admin', adminRoutes);


// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));