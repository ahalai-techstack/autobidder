import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Check,
} from 'typeorm';

@Entity('lots')
@Check('CHK_lot_end_after_start', '"end_time" > "start_time"')
@Check(
  'CHK_lot_current_more_or_equal_start_price',
  '"current_price" >= "start_price"',
)
export class Lot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  @Column({ name: 'owner_id', type: 'uuid' })
  ownerId: string;

  @Column({ name: 'car_id', type: 'uuid' })
  carId: string;

  @Column({ name: 'start_price', type: 'decimal' })
  startPrice: number;

  @Column({ name: 'current_price', type: 'decimal' })
  currentPrice: number;

  @Column({ name: 'start_time', type: 'timestamp with time zone' })
  startTime: Date;

  @Column({ name: 'end_time', type: 'timestamp with time zone' })
  endTime: Date;
}
