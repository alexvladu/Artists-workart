import {IsNotEmpty, IsNumber, IsString, IsStrongPassword} from "class-validator"

export class User{
    public constructor(username:string, password:string){
        this.username=username;
        this.password=password;
    }
    @IsNotEmpty()
    @IsString()
    username:string;

    @IsStrongPassword()
    password:string;

    posts:number[];
}