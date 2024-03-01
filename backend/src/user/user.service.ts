import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {Transaction} from  '../transaction/entities/transaction.entity'
import { TransactionService } from '../transaction/transaction.service'
import {hash} from 'bcrypt'
import { EnvelopeService } from '../envelope/envelope.service';
import { Envelope } from '../envelope/entities/envelope.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly transactionService: TransactionService,
    private readonly envelopeService: EnvelopeService
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.user_name = createUserDto.user_name;
    user.password = await hash(createUserDto.password, 10);
    user.balance = createUserDto.balance?createUserDto.balance:0;
    user.available_balance = createUserDto.available_balance?
    createUserDto.available_balance:0;
    user.envelopes = createUserDto.envelopes?createUserDto.envelopes:[];
    return this.userRepository.save(user);
  }

  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  viewUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  viewUserByName(user_name:string): Promise<User|undefined>{

    return this.userRepository.findOneBy({user_name})
  }

  async viewUserEnvelopes(id: number): Promise<Envelope[]>{

    return this.envelopeService.findAllEnvelope({
      relations:{
        user:true
      },

      where:{
        user:{id:id}
      },

      order:{
        id:"ASC"
      }
    })

  }

  async viewUserTransactions(id: number): Promise<Transaction[]>{

    return this.transactionService.findAllTransaction({

      relations:{
        envelope:{
         user:true
        }
      },
      where:{
        envelope:{
          user:{
            id:id
          }
        },
      },

      order: {
        tr_date: "DESC",
        id: "DESC"
      }

    })
  }




  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    if(updateUserDto.user_name){user.user_name = updateUserDto.user_name}
    if(updateUserDto.password){user.password = updateUserDto.password}
    if(updateUserDto.balance){user.balance = updateUserDto.balance}
    if(updateUserDto.available_balance){
      user.available_balance = updateUserDto.available_balance
    }
    if(updateUserDto.envelopes){
      user.envelopes = updateUserDto.envelopes
    }
    user.id = id;
    return this.userRepository.save(user);
  }

  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}