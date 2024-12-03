import { RowDataPacket } from 'mysql2';
import pool from '../config/db';

export interface Product {
  id?: number;
  product_Name: string;
  price: number;
  product_Description: string;
  image_path: string;
  shippingType: string;
  shippingPrice: number;
  category: 'Miku' | 'Warhammer'; 
}

export const getAllProducts = async (): Promise<Product[]> => {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM Products');
  return rows as Product[];
};

export const getProductById = async (id: number): Promise<Product | null> => {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM Products WHERE id = ?', [id]);
  const product = rows[0] as Product | undefined;
  return product || null;
};

export const searchProductsByName = async (product_Name: string) => {
  const query = `
    SELECT * FROM Products
    WHERE product_Name LIKE ?;
  `;
  const results = await pool.query(query, [`%${product_Name}%`]);
  return results[0];
};