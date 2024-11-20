import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

// Definir CustomRequest para que reciba información del token (usuario)
interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

// Middleware para verificar token
export function verificarToken(req: CustomRequest, res: Response, next: NextFunction): void {
  const token = req.cookies.token; // Obtener el token desde las cookies
  
  if (!token) {
    // Si no hay token, respondemos con un 401 y retornamos para evitar que continúe la ejecución
    res.status(401).json({ mensaje: 'Token not provided' });
    return;
  }

  // Verificar el token usando JWT
  jwt.verify(token, process.env.RSA_PRIVATE_KEY as string, { algorithms: ['RS256'] }, (err, user) => {
    if (err) {
      // Si hay un error al verificar el token, respondemos con un 403
      return res.status(403).json({ mensaje: 'Invalid token' });
    }

    // Si el token es válido, almacenamos la información del usuario en req.user
    req.user = user;

    // Continuamos con el siguiente middleware
    next();
  });
}

// Función para verificar y procesar datos seguros
export function verificarDatos(secureData: string): { userName?: string; email?: string; password?: string } {
  console.log("secureData received:", secureData);
  const partes = secureData.split(',');
  const resultado: { userName?: string; email?: string; password?: string } = {};

  partes.forEach((parte, index) => {
    if (parte) {
      resultado[index === 0 ? 'userName' : index === 1 && partes.length > 2 ? 'email' : 'password'] = parte;
    }
  });

  return resultado;
}

// Comparar contraseña con el hash almacenado en la base de datos
export async function comparePassword(passwordString: string, bdHash: string): Promise<boolean> {
  return await bcrypt.compare(passwordString, bdHash);
}
