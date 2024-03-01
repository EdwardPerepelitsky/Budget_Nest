import { Envelope } from 'src/envelope/entities/envelope.entity';
export declare class Transaction {
    id: number;
    amount: number;
    tr_date: Date;
    description: string;
    envelope: Envelope;
}
