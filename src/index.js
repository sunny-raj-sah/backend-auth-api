import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';


const app = express();


// Security & parsing
app.use(helmet());
app.use(cors({ origin: '*', credentials: false }));
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));


// Basic rate limit for auth endpoints
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api/auth', authLimiter);


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));


// Error handler (last)
app.use((err, _req, res, _next) => {
console.error(err);
res.status(err.status || 500).json({ error: err.message || 'Server error' });
});


const PORT = process.env.PORT || 4000;


connectDB().then(() => {
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});