import { Controller, Get, Post, UsePipes, ValidationPipe, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/auth/service/auth/auth.service';
import { User } from 'src/User/user.dto';
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('verify')
    verifyLogin(@Body('token') token:string){
        this.authService.validateToken(token);
        return token;
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() user:User){
        const userDB=this.authService.validateUser(user);
        if(userDB==null)
            throw new HttpException("Invalid login data", HttpStatus.PRECONDITION_FAILED);
        return {
            "username":userDB.username,
            "token":this.authService.generateToken(user)
        }
    }
}
