import {createUser} from '../models/userModel';

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


export default addUser;
