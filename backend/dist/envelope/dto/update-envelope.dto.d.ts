import { CreateEnvelopeDto } from './create-envelope.dto';
declare const UpdateEnvelopeDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateEnvelopeDto>>;
export declare class UpdateEnvelopeDto extends UpdateEnvelopeDto_base {
    eId?: number;
    deltaBudget?: number;
}
export {};
