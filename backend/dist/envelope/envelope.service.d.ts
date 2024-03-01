import { Repository } from 'typeorm';
import { CreateEnvelopeDto } from './dto/create-envelope.dto';
import { UpdateEnvelopeDto } from './dto/update-envelope.dto';
import { Envelope } from './entities/envelope.entity';
import { Transaction } from '../transaction/entities/transaction.entity';
import { TransactionService } from '../transaction/transaction.service';
export declare class EnvelopeService {
    private readonly envelopeRepository;
    private readonly transactionService;
    constructor(envelopeRepository: Repository<Envelope>, transactionService: TransactionService);
    createEnvelope(createEnvelopeDto: CreateEnvelopeDto): Promise<Envelope>;
    findAllEnvelope(findOptions: any): Promise<Envelope[]>;
    viewEnvelope(id: number): Promise<Envelope>;
    viewEnvelopeTransactions(id: number): Promise<Transaction[]>;
    updateEnvelope(id: number, updateEnvelopeDto: UpdateEnvelopeDto): Promise<Envelope>;
    removeEnvelope(envelope: Envelope): Promise<void>;
    removeEnvelopeId(id: number): Promise<{
        affected?: number;
    }>;
}
