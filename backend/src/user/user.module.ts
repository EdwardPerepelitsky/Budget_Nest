import { Module,forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EnvelopeModule } from '../envelope/envelope.module'
import { TransactionModule } from '../transaction/transaction.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User]),forwardRef(() => EnvelopeModule),
  forwardRef(() => TransactionModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}