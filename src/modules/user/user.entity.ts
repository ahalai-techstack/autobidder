import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Bid } from '../bid/bid.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  @Column({ name: 'first_name', type: 'varchar', length: 128 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 128 })
  lastName: string;

  @Column({ type: 'varchar', length: 128, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  password: string;

  @OneToMany(() => Bid, (bid) => bid.user)
  bids: Bid[];
}
