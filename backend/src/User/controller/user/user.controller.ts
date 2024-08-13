import { Controller, Get, Post, Body, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/serivce/user/user.service';
import { User } from 'src/User/user.dto';
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @Get('all')
    getUsers(){
        return this.userService;
    }
    @Post('add')
    @UsePipes(new ValidationPipe())
    addUser(@Body() user:User){
        const userDB=this.userService.getUserByUserName(user.username);
        if(userDB)
            throw new HttpException("Status invalid", HttpStatus.PRECONDITION_FAILED);
        this.userService.addUser(user);
        return user;
    }
}
