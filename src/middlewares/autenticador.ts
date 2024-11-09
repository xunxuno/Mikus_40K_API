import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    usuario?: string | JwtPayload;
}

export function verificarToken(req: CustomRequest, res: Response, next: NextFunction): Response | void {
    const tokenHeader = req.headers['authorization'];
    if (!tokenHeader) {
        return res.status(401).json({ mensaje: 'Token not provided' });
    }

    const token = tokenHeader.split(' ');
    if (token.length !== 2) {
        return res.status(401).json({ mensaje: 'Malformed token' });
    }

    jwt.verify(token[1], process.env.RSA_PRIVATE_KEY as string, { algorithms: ['RS256'] }, (err, usuario) => {
        if (err) {
            return res.status(403).json({ mensaje: 'Invalid token' });
        }
        req.usuario = usuario;
        next();
    });
}

export function verificarDatos(dataSegura: string): { nombre?: string; email?: string; password?: string } {
    console.log("DataSegura recibida:", dataSegura);
    const partes = dataSegura.split(',');
    const resultado: { nombre?: string; email?: string; password?: string } = {};

    partes.forEach((parte, index) => {
        if (parte) {
            resultado[index === 0 ? 'nombre' : index === 1 && partes.length > 2 ? 'email' : 'password'] = parte;
        }
    });

    return resultado;
}

export async function comparePassword(passwordString: string, bdHash: string): Promise<boolean> {
    return await bcrypt.compare(passwordString, bdHash);
}
