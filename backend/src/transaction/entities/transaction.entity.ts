import { Column, Entity, PrimaryGeneratedColumn,
    Index,ManyToOne } from 'typeorm';
import { Envelope } from 'src/envelope/entities/envelope.entity';

@Entity()
export class Transaction {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  
  @Column({ type: 'numeric', default:0 })
  amount: number;

  @Column({ type: 'date', default: new Date(),nullable:false })
  tr_date: Date;

  @Column({ type: 'varchar', length:1000, default:''})
  description: string;

  @ManyToOne(type => Envelope, envelope => envelope.transactions,
    {onDelete:"CASCADE"}) envelope: Envelope; 

}
