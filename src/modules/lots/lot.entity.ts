import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CarEntity } from '../cars/car.entity';
import { LotStatus } from 'src/common/enums/lot-status.enum';
import { BidEntity } from '../bids/bid.entity';
import { WatchlistEntity } from '../watchlist/watchlist.entity';

@Entity('lots')
export class LotEntity extends BaseEntity {
  @OneToOne(() => CarEntity, (car) => car.lot, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'car_id' })
  car: CarEntity;

  @Column({ name: 'start_price', type: 'numeric', precision: 12, scale: 2 })
  startPrice: string; // numeric maps to string in pg driver

  @Column({ name: 'current_price', type: 'numeric', precision: 12, scale: 2 })
  currentPrice: string;

  @Column({ name: 'start_time', type: 'timestamptz' })
  startTime: Date;

  @Column({ name: 'end_time', type: 'timestamptz' })
  endTime: Date;

  @Column({ type: 'enum', enum: LotStatus, default: LotStatus.SCHEDULED })
  status: LotStatus;

  @OneToMany(() => BidEntity, (bid) => bid.lot, { cascade: true })
  bids: BidEntity[];

  @OneToMany(() => WatchlistEntity, (wl) => wl.lot, { cascade: true })
  watchlistedBy: WatchlistEntity[];
}
