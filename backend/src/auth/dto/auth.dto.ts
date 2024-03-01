import {
    IsString,
  } from 'class-validator';

    
  export class SignInDto {

  
    @IsString()
    user_name: string;

    @IsString()
    password: string;
    
  }