import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
  ) {}

  createTransaction(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const transaction: Transaction = new Transaction();
    transaction.amount = createTransactionDto.amount?createTransactionDto.amount:0;
    transaction.tr_date = createTransactionDto.tr_date?
    createTransactionDto.tr_date:new Date();
    transaction.description = createTransactionDto.description?
    createTransactionDto.description:'';
    return this.transactionRepository.save(transaction);
  }

  findAllTransaction(findOptions): Promise<Transaction[]> {
    return this.transactionRepository.find(findOptions);
  }

  viewTransaction(id: number): Promise<Transaction> {
    return this.transactionRepository.findOneBy({ id });
  }


  updateTransaction(id: number, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
    const transaction: Transaction = new Transaction();
    if (transaction.amount){transaction.amount = updateTransactionDto.amount}
    if(transaction.tr_date){transaction.tr_date = updateTransactionDto.tr_date}
    if(transaction.description){transaction.description = updateTransactionDto.description}
    transaction.id = id;
    return this.transactionRepository.save(transaction);
  }

  async removeTransaction(trn: Transaction): Promise<void> {
    await this.transactionRepository.remove(trn);
  }
}