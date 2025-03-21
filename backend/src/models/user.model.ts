import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/user';
import bcrypt from 'bcrypt';

class UserModel {
    private users: User[] = []

    findAll() {
        return this.users;
    }
    findById(id: string) {
        const user = this.users.find(u => u.id === id)
        if(!user) return null
        return user
    }

   
    async editUserById(id: string, updates: Partial<User>) {
        const foundIndex = this.users.findIndex(u => u.id === id)
        if(foundIndex === -1) return false

        let hashedPassword = undefined
        if (updates.password) {
            hashedPassword = await bcrypt.hash(updates.password, 12)
        }
        const updatedUser: User = {
            ...this.users[foundIndex],
            username: updates.username ?? this.users[foundIndex].username,
            password: hashedPassword ? hashedPassword : this.users[foundIndex].password,
            favorite: updates.favorite ?? this.users[foundIndex].favorite,
        }
        this.users[foundIndex] = updatedUser
        return updatedUser
    }

    async createUser(newUser: Omit<User, "id" | "favorite" |"rate">) {
        const { username, password } = newUser;
        const foundIndex = this.users.findIndex(user => user.username === username);
        if(foundIndex !== -1) return false
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = {
            id: uuidv4(),
            username,
            password: hashedPassword,
            favorite: "Not paticular",
            rate: 0
        }
        this.users.push(user)
        return user
    }

    
    async checkUserPass(username:string, password: string) {
        const user = this.users.find(u => u.username === username)
        if(!user) return false
        const isMatched: boolean = await bcrypt.compare(password, user.password)
        if(!isMatched) return false
        return user
    }
}

export default new UserModel