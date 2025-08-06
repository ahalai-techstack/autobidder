import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Check,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { CarBrand } from '../car-brand/car-brand.entity';
import { CarModel } from '../car-model/car-model.entity';

enum LotStatus {
  Upcoming = 'Upcoming',
  Open = 'Open',
  Finished = 'Finished',
  Cancelled = 'Cancelled',
}

@Entity('lots')
@Check('CHK_lot_end_after_start', '"end_time" > "start_time"')
@Check(
  'CHK_lot_current_more_or_equal_start_price',
  '"current_price" >= "start_price"',
)
export class Lot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: LotStatus,
    default: LotStatus.Upcoming,
  })
  status: LotStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Column({ name: 'owner_id', type: 'uuid' })
  ownerId: string;

  @Column({ name: 'brand_id', type: 'uuid' })
  brandId: string;

  @Column({ name: 'model_id', type: 'uuid' })
  modelId: string;

  @Column({ name: 'start_price', type: 'decimal' })
  startPrice: number;

  @Column({ name: 'current_price', type: 'decimal' })
  currentPrice: number;

  @Column({ name: 'start_time', type: 'timestamptz' })
  startTime: Date;

  @Column({ name: 'end_time', type: 'timestamptz' })
  endTime: Date;

  @Column({ unique: true, nullable: false })
  vin: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @ManyToOne(() => CarBrand, (carBrand) => carBrand.lots)
  @JoinColumn({ name: 'brand_id' })
  brand: CarBrand;

  @ManyToOne(() => CarModel, (carModel) => carModel.lots)
  @JoinColumn({ name: 'model_id' })
  model: CarModel;
}
