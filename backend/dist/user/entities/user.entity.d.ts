import { Envelope } from '../../envelope/entities/envelope.entity';
export declare class User {
    id: number;
    user_name: string;
    password: string;
    balance: number;
    available_balance: number;
    envelopes: Envelope[];
}
