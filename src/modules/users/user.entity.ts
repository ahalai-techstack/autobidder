import { CreateDateColumn, OneToMany, Column, Unique, Entity } from 'typeorm';
import { CarEntity } from '../cars/car.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { BidEntity } from '../bids/bid.entity';
import { WatchlistEntity } from '../watchlist/watchlist.entity';
import { LotEntity } from '../lots/lot.entity';

@Entity('users')
@Unique(['email'])
export class UserEntity extends BaseEntity {
  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 100 })
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @OneToMany(() => CarEntity, (car) => car.owner)
  cars: CarEntity[];

  @OneToMany(() => BidEntity, (bid) => bid.user)
  bids: BidEntity[];

  @OneToMany(() => WatchlistEntity, (wl) => wl.user)
  watchlistRows: WatchlistEntity[];

  @OneToMany(() => LotEntity, (lot) => lot.owner)
  lots: LotEntity[];
}
