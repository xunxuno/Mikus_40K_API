import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/routes';
import userRoutes from './routes/routes';
import cookieParser from 'cookie-parser';

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, 
};

// Using CORS with configured options
app.use(cors(corsOptions));

// Middleware for processing JSON
app.use(express.json());

// Use cookie-parser to read cookies
app.use(cookieParser()); 

app.use('/dataBase/Images', express.static('Images'));


// Routes
app.use('/api', productRoutes);
app.use('/api', userRoutes);

// Start server
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
