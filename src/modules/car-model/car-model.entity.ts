import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarBrand } from '../car-brand/car-brand.entity';
import { Lot } from '../lot/lot.entity';

@Entity({
  name: 'car_models',
})
export class CarModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'brand_id' })
  brandId: string;

  @Column({
    type: 'varchar',
    length: 128,
  })
  name: string;

  @ManyToOne(() => CarBrand)
  @JoinColumn({ name: 'brand_id' })
  brand: CarBrand;

  @OneToMany(() => Lot, (lot) => lot.model)
  lots: Lot[];
}
