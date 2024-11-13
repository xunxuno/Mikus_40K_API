import pool from '../config/db';

export interface User {
    id?: number;
    userName: string;
    email: string;
    password: string;
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

  /* POSTMAN FORMAT for POST
  {
  "secureData": {
    "userName": "ejemplo",
    "email": "ejemplo@gmail.com",
    "password": "$2y$10$2zAlMDuD6mCic7/2Pl4YGOaZDrJNIhJSu.Nz232xny1fd1Gt.BbcC"
  }
}
*/