import {User ,createUser, getUserByEmail, createUserDetails, getUserDetailsById, UserDetails, updateUserDetails} from '../models/userModel';

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

export const saveUserDetails = async (details: UserDetails): Promise<void> => {
    await createUserDetails(details);
  };
  
  export const updateUserDetails_ = async (details: UserDetails): Promise<string> => {
    try {
      await updateUserDetails(details);
      return "Detalles del usuario actualizados correctamente";
    } catch (error) {
      throw new Error("Error al actualizar los detalles del usuario");
    }
  };

  export const fetchUserDetails = async (userId: number): Promise<UserDetails | null> => {
    return await getUserDetailsById(userId);
  };


export  { addUser, getUserByUserEmail };
