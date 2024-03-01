import { Transaction } from '../../transaction/entities/transaction.entity';
export declare class CreateEnvelopeDto {
    category: string;
    budget?: number;
    spent?: number;
    transactions?: Transaction[];
}
export declare class RemoveEnvelopeDto {
    eId: number;
    budget: number;
    spent: number;
}
