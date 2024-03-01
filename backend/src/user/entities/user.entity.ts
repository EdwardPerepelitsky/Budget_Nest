import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import {Envelope} from '../../envelope/entities/envelope.entity'

@Entity()
export class User {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128, unique:true })
  user_name: string;

  @Column({ type: 'varchar', length: 128, nullable:false })
  password: string;

  @Column({ type: 'numeric', default:0 })
  balance: number;

  @Column({ type: 'numeric', default:0 })
  available_balance: number;

  @OneToMany(type => Envelope, envelope => envelope.user,
    {onDelete:"CASCADE"}) envelopes: Envelope[];

}