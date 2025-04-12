const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config'); // Using the CommonJS version
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();
connectDB();

const app = express();

// ✅ Allow requests from your frontend domain
app.use(cors({
  origin: 'https://ecommerceproject-gamma.vercel.app',
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);

// Root test route
app.get('/', (req, res) => res.send('API running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
