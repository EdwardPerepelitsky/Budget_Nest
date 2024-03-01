import {
    IsString,
    IsNumber,
    IsOptional,
    IsDate
  } from 'class-validator';

    
  export class CreateTransactionDto {

  
    @IsNumber()
    eId:number

    @IsString()
    typeTr:string
    
    @IsOptional()
    @IsNumber()
    amount?:number

    @IsOptional()
    @IsDate()
    tr_date?:Date

    @IsOptional()
    @IsString()
    description?:string

    @IsOptional()
    @IsNumber()
    budget:number

    @IsOptional()
    @IsNumber()
    spent:number
    
  }