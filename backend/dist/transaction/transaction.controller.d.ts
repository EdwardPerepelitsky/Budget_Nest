import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { EnvelopeService } from '../envelope/envelope.service';
import { UserService } from '../user/user.service';
export declare class TransactionController {
    private readonly transactionService;
    private readonly envelopeService;
    private readonly userService;
    constructor(transactionService: TransactionService, envelopeService: EnvelopeService, userService: UserService);
    create(createTransactionDto: CreateTransactionDto, req: any): Promise<{
        balance: number;
        availableBalance: number;
        access_token: any;
        envBudget?: undefined;
        envSpent?: undefined;
    } | {
        envBudget: number;
        envSpent: number;
        balance: number;
        access_token: any;
        availableBalance?: undefined;
    }>;
}
