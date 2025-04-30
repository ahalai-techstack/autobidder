import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { CarImageEntity } from '../car-images/car-image.entity';
import { CarDocumentEntity } from '../car-documents/car.document.entity';
import { LotEntity } from '../lots/lot.entity';

@Entity('cars')
export class CarEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.cars, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity | null;

  @Column({ name: 'brand', type: 'text' })
  brand: string;

  @Column({ name: 'model', type: 'text' })
  model: string;

  @Column({ type: 'smallint' })
  year: number;

  @Column({ type: 'char', length: 17, unique: true })
  vin: string;

  @Column({ type: 'integer' })
  mileage: number;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => CarImageEntity, (img) => img.car, { cascade: true })
  images: CarImageEntity[];

  @OneToMany(() => CarDocumentEntity, (doc) => doc.car, { cascade: true })
  documents: CarDocumentEntity[];

  @OneToOne(() => LotEntity, (lot) => lot.car, { cascade: true })
  lot: LotEntity;
}
