import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { comparePassword } from '../middlewares/autenticador';
import {addUser, getUserByUserEmail, saveUserDetails, fetchUserDetails} from '../services/userServices';
import {SecureData} from '../models/secureDataModel';
import { User } from '../models/userModel';


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

export async function loginUsuario(req: Request, res: Response): Promise<Response | void> {
    const { secureData } = req.body as { secureData: SecureData };
    console.log('secureData = ',secureData);

  try {
      console.log('Trying to get user by email:', secureData.email);
      const user = await _getUserByemail(secureData.email);

      if (!user) {
          console.log('User not found');
          return res.status(404).send('Incorrect email');
      }

      console.log('User Found:', user);


      const validPassword = await comparePassword(secureData.password, user.password);

      if (!validPassword) {
          console.log('Incorrect password');
          return res.status(404).send('Incorrect password');
      } else {
          console.log('Password correct, generating token');
          const token = jwt.sign(
              { id: user.id, nombre: user.userName, email: user.email },
              process.env.JWT_SECRET as string,
              { expiresIn: '1h' }
          );
          console.log('Returning token and userId:', { token, userId: user.id, userName: user.userName , userEmail: user.email });
          return res.status(200).json({ token, userId: user.id,  userName: user.userName, userEmail: user.email});
      }
  } catch (error) {
      console.error('Error logging in user:', error);
      return res.status(500).send('Internal Server Error');
  }
}

async function _getUserByemail(userName: string): Promise<User | undefined> {
  try {
      const user = await getUserByUserEmail(userName);
      return user;
  } catch (error) {
      console.error('Error getting user by name:', error);
      throw error; // Throw the error so it can be caught in loginUser
  }
}


export const createUserDetails = async (req: Request, res: Response): Promise<void> => {
    const { user_id, first_name, last_name, phone_number, country, city, zip_code, street, house_number } = req.body;
  
    if (!user_id || !first_name || !last_name || !phone_number ||!country || !city || !zip_code || !street || !house_number) {
      res.status(400).json({ error: 'Campos obligatorios faltantes' });
      return;
    }
  
    try {
      await saveUserDetails({
        user_id,
        first_name,
        last_name,
        phone_number,
        country,
        city,
        zip_code,
        street,
        house_number,
      });
      res.status(200).json({ message: 'Detalles de usuario creados correctamente' });
    } catch (error) {
      console.error('Error al actualizar crear de usuario:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  };
  

  export const getUserDetails = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.userId);
  
    if (isNaN(userId)) {
      res.status(400).json({ error: 'ID de usuario inválido' });
      return;
    }
  
    try {
      const details = await fetchUserDetails(userId);
      if (!details) {
        res.status(404).json({ error: 'Detalles de usuario no encontrados' });
        return;
      }
      res.status(200).json(details);
    } catch (error) {
      console.error('Error al obtener detalles de usuario:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  };