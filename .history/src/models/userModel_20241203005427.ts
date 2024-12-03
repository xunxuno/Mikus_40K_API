import pool from '../config/db';
import { RowDataPacket } from 'mysql2/promise';

export interface User {
    id?: number;
    userName: string;
    email: string;
    password: string;
}

export interface DatabaseUser {
    id?: number;
    userName: string;
    email: string;
    password_hash: string;
}

export interface UserDetails {
    id?: number;
    user_id: number;
    first_name: string;
    last_name: string;
    phone_number?: string;
    country: string;
    city: string;
    zip_code: string;
    street?: string;
    house_number?: string;
  }

export interface RequestWithUser extends Express.Request {
    user?: User;
    body: any; 
  }

//Function to Add a new user
export const createUser = async (user: User): Promise<void> => {
    const { userName, email, password } = user;
    try {
        await pool.query('INSERT INTO Users (userName, email, password_hash) VALUES (?, ?, ?)', [userName, email, password]);
    } catch (error) {
        console.error('Error at adding new user', error);
        throw error;
    }
  };

  // Function to get a user by their name (login)
  export const getUserByEmail = async (email: string): Promise<User | undefined> => {
    try {
        const [results]: any = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);

        if (results.length > 0) {
            const dbUser: DatabaseUser = results[0]; // Tipamos explícitamente como DatabaseUser

            // Convertimos DatabaseUser a User
            const user: User = {
                id: dbUser.id,
                userName: dbUser.userName,
                email: dbUser.email,
                password: dbUser.password_hash, // Mapeamos password_hash a password
            };

            return user;
        }

        return undefined; // No se encontró el usuario
    } catch (error) {
        console.error('Error at getting user by email', error);
        throw error;
    }
};

// Función para crear o actualizar detalles de usuario
export const createUserDetails = async (details: UserDetails): Promise<void> => {
    const query = `
      INSERT INTO UserDetails (user_id, first_name, last_name, phone_number, country, city, zip_code, street, house_number)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        first_name = VALUES(first_name),
        last_name = VALUES(last_name),
        phone_number = VALUES(phone_number),
        country = VALUES(country),
        city = VALUES(city),
        zip_code = VALUES(zip_code),
        street = VALUES(street),
        house_number = VALUES(house_number)
    `;
  
    const values = [
      details.user_id,
      details.first_name,
      details.last_name,
      details.phone_number || null,
      details.country,
      details.city,
      details.zip_code,
      details.street || null,
      details.house_number || null,
    ];
  
    await pool.query(query, values);
  };
  

  export const updateUserDetails = async (details: UserDetails): Promise<void> => {
    const {
      user_id,
      first_name,
      last_name,
      phone_number,
      country,
      city,
      zip_code,
      street,
      house_number,
    } = details;
  
    const query = `
      UPDATE UserDetails
      SET 
        first_name = ?,
        last_name = ?,
        phone_number = ?,
        country = ?,
        city = ?,
        zip_code = ?,
        street = ?,
        house_number = ?
      WHERE user_id = ?
    `;
  
    await pool.query(query, [
      first_name,
      last_name,
      phone_number,
      country,
      city,
      zip_code,
      street,
      house_number,
      user_id,
    ]);
  };
  
  // Función para obtener detalles de usuario
  export const getUserDetailsById = async (userId: number): Promise<UserDetails | null> => {
    const query = 'SELECT * FROM UserDetails WHERE user_id = ?';
    const [rows] = await pool.query<RowDataPacket[]>(query, [userId]);
    return rows.length > 0 ? (rows[0] as UserDetails) : null;
  };
  