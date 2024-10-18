import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

// Middleware para procesar JSON
app.use(express.json());

app.use('/api', productRoutes);


// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
