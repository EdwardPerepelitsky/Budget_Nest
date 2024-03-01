import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Transaction } from '../transaction/entities/transaction.entity';
import { TransactionService } from '../transaction/transaction.service';
import { EnvelopeService } from '../envelope/envelope.service';
import { Envelope } from '../envelope/entities/envelope.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly transactionService;
    private readonly envelopeService;
    constructor(userRepository: Repository<User>, transactionService: TransactionService, envelopeService: EnvelopeService);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findAllUser(): Promise<User[]>;
    viewUser(id: number): Promise<User>;
    viewUserByName(user_name: string): Promise<User | undefined>;
    viewUserEnvelopes(id: number): Promise<Envelope[]>;
    viewUserTransactions(id: number): Promise<Transaction[]>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    removeUser(id: number): Promise<{
        affected?: number;
    }>;
}
