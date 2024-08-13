import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { User } from 'src/User/user.dto';
@Injectable()
export class UserService {
    private users: User[];

    constructor() {
        this.loadUsers();
    }

    private loadUsers() {
        const data = fs.readFileSync('src/user/users.json', 'utf8');
        this.users = JSON.parse(data);
    }
    getUsers(){
        return this.users;
    }
    addUser(user:User){
        this.users.push(user);
    }
    getUserByUserName(name:string){
        for(let i=0; i<this.users.length; i++)
            if(this.users[i].username==name)
                return this.users[i];
        return null;
    }
}
