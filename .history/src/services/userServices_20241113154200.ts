import {User ,createUser, getUserByName} from '../models/userModel';

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

async function getUserByUsername(name: string): Promise<User | undefined> {
    try {
        return await getUserByName(name);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error when fetching user by name in the service:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        throw error;
    }
}


export  { addUser, getUserByUsername };
