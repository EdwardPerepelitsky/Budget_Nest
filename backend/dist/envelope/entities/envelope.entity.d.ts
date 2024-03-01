import { User } from '../../user/entities/user.entity';
import { Transaction } from '../../transaction/entities/transaction.entity';
export declare class Envelope {
    id: number;
    category: string;
    budget: number;
    spent: number;
    user: User;
    transactions: Transaction[];
}
