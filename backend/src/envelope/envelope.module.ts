import { Module,forwardRef } from '@nestjs/common';
import { EnvelopeService } from './envelope.service';
import { EnvelopeController } from './envelope.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Envelope } from './entities/envelope.entity';
import { UserModule } from '../user/user.module';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [TypeOrmModule.forFeature([Envelope]),forwardRef(() => UserModule),
  forwardRef(() => TransactionModule)],
  controllers: [EnvelopeController],
  providers: [EnvelopeService],
  exports: [EnvelopeService]
})
export class EnvelopeModule {}
