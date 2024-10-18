import { RowDataPacket } from 'mysql2';
import pool from '../config/db';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  img: string;
}

export const getAllProducts = async (): Promise<Product[]> => {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM products');
  return rows as Product[];
};

export const getProductById = async (id: number): Promise<Product | null> => {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM products WHERE id = ?', [id]);
  const product = rows[0] as Product | undefined;
  return product || null;
};
