import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { LotEntity } from '../lots/lot.entity';
import { UserEntity } from '../users/user.entity';

@Entity('watchlist')
export class WatchlistEntity {
  @PrimaryColumn({ name: 'user_id', type: 'int' })
  userId: number;

  @PrimaryColumn({ name: 'lot_id', type: 'int' })
  lotId: number;

  @ManyToOne(() => UserEntity, (user) => user.watchlistRows, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => LotEntity, (lot) => lot.watchlistedBy, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lot_id' })
  lot: LotEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
