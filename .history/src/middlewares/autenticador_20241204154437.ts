import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

// Define CustomRequest to receive token (user) information
export interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

// Middleware to verify token
export function verificarToken(req: CustomRequest, res: Response, next: NextFunction): void {
  const token = req.cookies.token; // Get the token from cookies
  
  if (!token) {
    // If there is no token, respond with a 401 and return to prevent further execution.
    res.status(401).json({ mensaje: 'Token not provided' });
    return;
  }

  // Verify the token using JWT
  jwt.verify(token, process.env.RSA_PRIVATE_KEY as string, { algorithms: ['RS256'] }, (err, user) => {
    if (err) {
      // If there is an error verifying the token, respond with a 403
      return res.status(403).json({ mensaje: 'Invalid token' });
    }

    // If the token is valid, store the user information in req.user
    req.user = user;

    // continue with the following middleware
    next();
  });
}

// Function to verify and process secure data
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

// Compare password with hash stored in database
export async function comparePassword(passwordString: string, bdHash: string): Promise<boolean> {
  return await bcrypt.compare(passwordString, bdHash);
}
