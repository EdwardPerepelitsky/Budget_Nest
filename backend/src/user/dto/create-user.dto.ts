import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
    IsArray
  } from 'class-validator';

  import { Type } from 'class-transformer';

  import {Envelope} from '../../envelope/entities/envelope.entity'
    
  export class CreateUserDto {

    @IsString()
    @IsNotEmpty({message:'Email must be non-empty.'})
    @IsEmail(null, { message: 'Please provide valid Email.' })
    user_name: string;

    @IsString()
    @IsNotEmpty({message:'Password must be non-empty.'})
    password: string;

    @IsOptional()
    @IsNumber()
    balance?:number

    @IsOptional()
    @IsNumber()
    available_balance?:number

    @IsOptional()
    @IsArray()
    @Type(() => Envelope)
    envelopes: Envelope[]
    
  }

export class ChangePasswordDto{

  @IsString()
  password:string

  @IsString()
  newPassword:string

}