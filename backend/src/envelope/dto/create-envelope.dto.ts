import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
    IsArray
  } from 'class-validator';

  import { Type } from 'class-transformer';

  import {Transaction} from '../../transaction/entities/transaction.entity'
    
  export class CreateEnvelopeDto {

    @IsString()
    @IsNotEmpty({message:'Category must be non-empty.'})
    category: string;


    @IsOptional()
    @IsNumber()
    budget?:number

    @IsOptional()
    @IsNumber()
    spent?:number

    @IsOptional()
    @IsArray()
    @Type(() => Transaction)
    transactions?: Transaction[]
    
  }

  export class RemoveEnvelopeDto{

    @IsNumber()
    eId:number

    @IsNumber()
    budget:number

    @IsNumber()
    spent:number
  }
