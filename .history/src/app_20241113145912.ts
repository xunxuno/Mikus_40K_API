import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/routes';
import userRoutes from './routes/routes';

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

// Middleware para procesar JSON
app.use(express.json());

app.use('/api', productRoutes);
app.use('/api', productRoutes);
app.use('/api', userRoutes); 


// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
