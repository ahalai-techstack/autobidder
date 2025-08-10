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
import { CarModel } from '../car-model/car-model.entity';

@Entity('lots')
@Check('CHK_lot_end_after_start', '"end_time" > "start_time"')
export class Lot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Column({ name: 'owner_id', type: 'uuid' })
  ownerId: string;

  @Column({ name: 'model_id', type: 'uuid' })
  modelId: string;

  @Column({ name: 'start_price', type: 'decimal' })
  startPrice: number;

  @Column({ name: 'start_time', type: 'timestamptz' })
  startTime: Date;

  @Column({ name: 'end_time', type: 'timestamptz' })
  endTime: Date;

  @Column({ nullable: false })
  vin: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @ManyToOne(() => CarModel, (carModel) => carModel.lots)
  @JoinColumn({ name: 'model_id' })
  model: CarModel;
}
