import { Controller, Get, Post, Body, Patch, Param, Delete,
UseGuards, Request,HttpException,HttpStatus } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { EnvelopeService } from '../envelope/envelope.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateEnvelopeDto } from '../envelope/dto/update-envelope.dto';
import { UserService } from '../user/user.service';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { Transaction } from './entities/transaction.entity';


@Controller('users')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService,
    private readonly envelopeService: EnvelopeService,
    private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Post('addtransaction')
  async create(@Body() createTransactionDto: CreateTransactionDto,
  @Request() req){

    const userId = req.user.userId;

    const eId = Number(createTransactionDto.eId);
    const typeTr = createTransactionDto.typeTr
    const amount = Number(createTransactionDto.amount);
    
    let user = await this.userService.viewUser(userId)
    let balance = Number(user.balance);
    let availableBalance = Number(user.available_balance);

    let envelope = await this.envelopeService.viewEnvelope(eId)
    let updateEnvelopeDto:UpdateEnvelopeDto
    let id:number;
    ({id: id, ...updateEnvelopeDto} = envelope)
    await this.envelopeService.viewEnvelopeTransactions(eId)
    .then((result)=>updateEnvelopeDto.transactions=result)

    let updateUserDto:UpdateUserDto
      let uid:number;
      ({id: uid, ...updateUserDto} = user)
    
    let trn:Transaction

    if (typeTr==='deposit'){

      try{
        balance = balance + amount;
        availableBalance = availableBalance + amount;
        updateUserDto.balance =balance
        updateUserDto.available_balance = availableBalance
        trn = await this.transactionService.createTransaction(createTransactionDto)
        updateEnvelopeDto.transactions.push(trn)
        await this.envelopeService.updateEnvelope(eId,updateEnvelopeDto)
        await this.userService.updateUser(userId,updateUserDto)
      }

      catch (error){

        try{
          await this.transactionService.removeTransaction(trn)
        }
        catch (error) {console.log(error) }
        console.log(error)
        return;
      }


      return {
          balance: balance,
          availableBalance: availableBalance,
          access_token: req['access_token']
      };
    }


    if (typeTr==='withdraw'){

      if (amount > availableBalance){
        throw new HttpException(
          "You can't withdraw more money than available.",
           HttpStatus.CONFLICT
        )
    }

      try{
        balance = balance - amount;
        availableBalance = availableBalance - amount;
        updateUserDto.balance =balance
        updateUserDto.available_balance = availableBalance
        trn = await this.transactionService.createTransaction(createTransactionDto)
        updateEnvelopeDto.transactions.push(trn)
        await this.envelopeService.updateEnvelope(eId,updateEnvelopeDto)
        await this.userService.updateUser(userId,updateUserDto)
      }

      catch (error){

        try{
          await this.transactionService.removeTransaction(trn)
        }
        catch (error) {console.log(error) }
        console.log(error)
        return;
      }


      return {
          balance: balance,
          availableBalance: availableBalance,
          access_token: req['access_token']
      };
    }

    let envelopeBalance = Number(envelope.budget);
    let envelopeSpent = Number(envelope.spent)

    if (amount > envelopeBalance){

      throw new HttpException(
        "You can't spend more money than allocated for this category.",
         HttpStatus.CONFLICT
      )
  }

    try{
      envelopeBalance = envelopeBalance - amount
      envelopeSpent = envelopeSpent + amount
      balance = balance - amount
      updateUserDto.balance =balance
      updateUserDto.available_balance = availableBalance
      trn = await this.transactionService.createTransaction(createTransactionDto)
      updateEnvelopeDto.transactions.push(trn)
      updateEnvelopeDto.budget = envelopeBalance
      updateEnvelopeDto.spent = envelopeSpent
      await this.envelopeService.updateEnvelope(eId,updateEnvelopeDto)
      await this.userService.updateUser(userId,updateUserDto)
    }

    catch (error){

      try{
        await this.transactionService.removeTransaction(trn)
      }
      catch (error) {console.log(error) }
      console.log(error)
      return;
    }

    return {
      envBudget: envelopeBalance,
      envSpent: envelopeSpent,
      balance: balance,
      access_token: req['access_token']
    }

  }

  
}
