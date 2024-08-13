import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/serivce/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/User/user.dto';
@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService, private userService: UserService,
      ) {}
    validateUser(user:User){
        const users=this.userService.getUsers();
        for(let i=0; i<users.length; i++)
            if(users[i].username==user.username && users[i].password==user.password)
                return user;
        return null;
    }
    validateToken(token:string){
        const decode=this.jwtService.verify(token);
        return decode;
    }
    generateToken(user:User) {
        const payload = { username: user.username };
        return this.jwtService.sign(payload);
    }
}
