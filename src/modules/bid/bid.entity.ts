import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bids')
export class Bid {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
