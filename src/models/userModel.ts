//import { RowDataPacket } from 'mysql2';
import pool from '../config/db';

export interface User {
    id?: number;
    userName: string;
    //firstName: string;
    //lastName: string;
    email: string;
    password: string;
}

//Function to Add a new user
export const createUser = async (user: User): Promise<void> => {
    const { userName, email, password } = user;
    await pool.query('INSERT INTO users (userName, email, password) VALUES (?, ?, ?)', [userName, email, password]);
  };