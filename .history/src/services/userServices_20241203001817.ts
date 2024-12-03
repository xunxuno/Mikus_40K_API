import {User ,createUser, getUserByEmail, createOrUpdateUserDetails, getUserDetailsById} from '../models/userModel';

async function addUser(name: string, email: string, password: string): Promise<void> {
    try {
        await createUser({ userName: name, email, password });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error when registering user in the service:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        throw error;
    }
}

async function getUserByUserEmail(email: string): Promise<User | undefined> {
    try {
        return await getUserByEmail(email);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error when fetching user by email in the service:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        throw error;
    }
}

export const saveUserDetails = async (details: userModel.UserDetails): Promise<void> => {
    await createOrUpdateUserDetails(details);
  };
  
  // Obtener detalles de usuario
  export const fetchUserDetails = async (userId: number): Promise<userModel.UserDetails | null> => {
    return await getUserDetailsById(userId);
  };


export  { addUser, getUserByUserEmail };
