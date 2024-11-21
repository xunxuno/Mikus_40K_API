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

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Cambia esto a la URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
  credentials: true, // Necesario para enviar cookies
};

// Usar CORS con las opciones configuradas
app.use(cors(corsOptions));

// Middleware para procesar JSON
app.use(express.json());

// Usar cookie-parser para leer las cookies
app.use(cookieParser()); 

app.use('/dataBase/Images', express.static('Images'));


// Rutas
app.use('/api', productRoutes);
app.use('/api', userRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
