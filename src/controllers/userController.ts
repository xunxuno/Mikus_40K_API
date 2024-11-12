import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { comparePassword } from '../middlewares/autenticador';
import addUser from '../services/userServices';
import {SecureData} from '../models/secureDataModel';


export async function addNewUser(req: Request, res: Response): Promise<Response | void> {
  const { secureData } = req.body as { secureData: SecureData };
  try {
      // Verify that secureData contains the required properties
      if (!secureData.userName || !secureData.email || !secureData.password) {
          throw new Error('Incorrect Secure Data Format');
      }

      await addUser(secureData.userName, secureData.email, secureData.password);
      return res.status(201).send('User registered successfully');
  } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).send('Internal Server Error');
  }
}

/*export async function loginUsuario(req: Request, res: Response): Promise<Response | void> {
  const { dataSegura } = req.body as { dataSegura: DataSegura };

  try {
      console.log('Intentando obtener usuario por nombre:', dataSegura.userName);
      const usuario = await _obtenerUsuarioPorNombre(dataSegura.userName);

      if (!usuario) {
          console.log('Usuario no encontrado');
          return res.status(404).send('Usuario incorrecto');
      }

      console.log('Usuario encontrado:', usuario);

      const validPassword = await comparePassword(dataSegura.password, usuario.password_hash);

      if (!validPassword) {
          console.log('Contraseña incorrecta');
          return res.status(404).send('Contraseña incorrecta');
      } else {
          console.log('Contraseña correcta, generando token');
          const token = jwt.sign(
              { id: usuario.id, nombre: usuario.nombre },
              process.env.JWT_SECRET as string,
              { expiresIn: '1h' }
          );
          console.log('Retornando token y userId:', { token, userId: usuario.id });
          return res.status(200).json({ token, userId: usuario.id });
      }
  } catch (error) {
      console.error('Error al logear usuario:', error);
      return res.status(500).send('Error interno del servidor');
  }
}

async function _obtenerUsuarioPorNombre(nombre: string): Promise<Usuario | null> {
  try {
      const usuario = await obtenerPorNombre(nombre);
      return usuario;
  } catch (error) {
      console.error('Error al obtener usuario por nombre:', error);
      throw error; // Lanzar el error para que pueda ser capturado en loginUsuario
  }
}*/