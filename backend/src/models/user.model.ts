import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/user';
import bcrypr from 'bcrypt';

class UserModel {
    private users: User[] = []

    findAll() {
        return this.users;
    }

    async createUser(newUser: Omit<User, "id" | "rate">) {
        const { username, password } = newUser;
        const foundIndex = this.users.findIndex(user => user.username === username);
        if(foundIndex !== -1) return false
        const hashedPassword = await bcrypr.hash(password, 12);
        const user = {
            id: uuidv4(),
            username,
            password: hashedPassword,
            rate: 0
        }
        this.users.push(user)
        return user
    }
}

export default new UserModel