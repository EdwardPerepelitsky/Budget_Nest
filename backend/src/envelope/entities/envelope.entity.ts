import { Column, Entity, PrimaryGeneratedColumn,
    Index,ManyToOne,OneToMany } from 'typeorm';
import {User} from  '../../user/entities/user.entity'
import { Transaction} from '../../transaction/entities/transaction.entity'


@Entity()
@Index(["user", "category"], { unique: true })
export class Envelope {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length:32})
  category: string;
  
  @Column({ type: 'numeric', default:0 })
  budget: number;

  @Column({ type: 'numeric', default:0 })
  spent: number;

  @ManyToOne(type => User, user => user.envelopes) user: User; 

  @OneToMany(type => Transaction, transaction => transaction.envelope,
    {onDelete:"CASCADE"}) transactions: Transaction[];

}
