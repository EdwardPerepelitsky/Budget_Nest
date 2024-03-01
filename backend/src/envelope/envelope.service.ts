import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEnvelopeDto } from './dto/create-envelope.dto';
import { UpdateEnvelopeDto } from './dto/update-envelope.dto';
import { Envelope } from './entities/envelope.entity';
import { Transaction } from '../transaction/entities/transaction.entity';
import { TransactionService } from '../transaction/transaction.service';

@Injectable()
export class EnvelopeService {
  constructor(
    @InjectRepository(Envelope) private readonly envelopeRepository: Repository<Envelope>,
    private readonly transactionService: TransactionService,
  ) {}

  createEnvelope(createEnvelopeDto: CreateEnvelopeDto): Promise<Envelope> {
    const envelope: Envelope = new Envelope();
    envelope.category = createEnvelopeDto.category;
    envelope.budget = createEnvelopeDto.budget?createEnvelopeDto.budget:0;
    envelope.spent = createEnvelopeDto.spent?createEnvelopeDto.spent:0;
    envelope.transactions = createEnvelopeDto.transactions?
    createEnvelopeDto.transactions:[];
    return this.envelopeRepository.save(envelope);
  }

  findAllEnvelope(findOptions): Promise<Envelope[]> {
    return this.envelopeRepository.find(findOptions);
  }

  viewEnvelope(id: number): Promise<Envelope> {
    return this.envelopeRepository.findOneBy({ id });
  }

  viewEnvelopeTransactions(id:number): Promise<Transaction[]>{
    return this.transactionService.findAllTransaction(
      {
        relations:{
          envelope:true
        },
        where:{
          envelope:{
            id:id
          }
        },
        order:{
          id:"ASC"
        }
      }
    )
  }


  updateEnvelope(id: number, updateEnvelopeDto: UpdateEnvelopeDto): Promise<Envelope> {
    const envelope: Envelope = new Envelope();
    if (updateEnvelopeDto.category){envelope.category = updateEnvelopeDto.category}
    if (updateEnvelopeDto.budget){envelope.budget =updateEnvelopeDto.budget}
    if (updateEnvelopeDto.spent) { envelope.spent = updateEnvelopeDto.spent}
    if (updateEnvelopeDto.transactions){
      envelope.transactions = updateEnvelopeDto.transactions
    }
    envelope.id = id;
    return this.envelopeRepository.save(envelope);
  }

  async removeEnvelope(envelope: Envelope): Promise<void> {
    await this.envelopeRepository.remove(envelope);
  }

  removeEnvelopeId(id: number): Promise<{ affected?: number }> {
    return this.envelopeRepository.delete(id);
  }

}