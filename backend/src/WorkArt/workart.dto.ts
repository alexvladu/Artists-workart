import {IsNotEmpty, IsNumber, IsString } from "class-validator"

export class WorkArtDTO{

    @IsNotEmpty()
    @IsString()
    owner:string;

    @IsString()
    @IsNotEmpty()
    title:string;

    @IsString()
    @IsNotEmpty()
    description:string;

}