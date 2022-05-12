import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Gender } from "../enum/gender.enum";

export class RegisterDto {
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender;

    @IsNotEmpty()
    birthDate: Date;

    @IsOptional()
    intro: string;
  
  }