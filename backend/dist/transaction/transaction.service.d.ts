import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
export declare class TransactionService {
    private readonly transactionRepository;
    constructor(transactionRepository: Repository<Transaction>);
    createTransaction(createTransactionDto: CreateTransactionDto): Promise<Transaction>;
    findAllTransaction(findOptions: any): Promise<Transaction[]>;
    viewTransaction(id: number): Promise<Transaction>;
    updateTransaction(id: number, updateTransactionDto: UpdateTransactionDto): Promise<Transaction>;
    removeTransaction(trn: Transaction): Promise<void>;
}
