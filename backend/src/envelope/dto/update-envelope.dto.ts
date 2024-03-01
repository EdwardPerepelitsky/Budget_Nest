import { PartialType } from '@nestjs/mapped-types';
import { CreateEnvelopeDto } from './create-envelope.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateEnvelopeDto extends PartialType(CreateEnvelopeDto) {
    
    @IsOptional()
    @IsNumber()
    eId?:number

    @IsOptional()
    @IsNumber()
    deltaBudget?:number
}
