import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { LotEntity } from '../lots/lot.entity';
import { UserEntity } from '../users/user.entity';

@Entity('bids')
export class BidEntity extends BaseEntity {
  @ManyToOne(() => LotEntity, (lot) => lot.bids, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lot_id' })
  lot: LotEntity;

  @ManyToOne(() => UserEntity, (user) => user.bids, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  amount: string;
}
