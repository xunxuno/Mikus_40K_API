import pool from '../config/db';

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

  /* POSTMAN FORMAT for POST
  {
  "secureData": {
    "userName": "ejemplo",
    "email": "ejemplo@gmail.com",
    "password": "$2y$10$2zAlMDuD6mCic7/2Pl4YGOaZDrJNIhJSu.Nz232xny1fd1Gt.BbcC"
  }
}
*/