import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { EnvelopeModule } from './envelope/envelope.module';
import { TransactionModule } from './transaction/transaction.module';
import { User } from './user/entities/user.entity';
import { Envelope } from './envelope/entities/envelope.entity';
import { Transaction } from './transaction/entities/transaction.entity';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'mysecretpassword',
      username: 'edward',
      entities: [User,Envelope,Transaction],
      database: 'pgwithnest',
      synchronize: true,
      logging: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../frontend', 'build')
    }),
    UserModule,
    EnvelopeModule,
    TransactionModule,
    AuthModule,
  ],
})

export class AppModule{}


