import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    user?: string | JwtPayload;
}

export function verificarToken(req: CustomRequest, res: Response, next: NextFunction): void {
    const tokenHeader = req.headers['authorization'];
    if (!tokenHeader) {
        res.status(401).json({ mensaje: 'Token not provided' });
        return;
    }

    const token = tokenHeader.split(' ');
    if (token.length !== 2) {
        res.status(401).json({ mensaje: 'Malformed token' });
        return;
    }

    jwt.verify(token[1], process.env.RSA_PRIVATE_KEY as string, { algorithms: ['RS256'] }, (err, user) => {
        if (err) {
            res.status(403).json({ mensaje: 'Invalid token' });
            return;
        }
        req.user = user;
        next();
    });
}

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

export async function comparePassword(passwordString: string, bdHash: string): Promise<boolean> {
    return await bcrypt.compare(passwordString, bdHash);
}
