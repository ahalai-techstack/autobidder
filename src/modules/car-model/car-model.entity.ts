import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarBrand } from '../car-brand/car-brand.entity';

@Entity({
  name: 'car_models',
})
export class CarModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CarBrand)
  @JoinColumn({ name: 'brand_id' })
  brand: CarBrand;

  @Column({
    type: 'varchar',
    length: 128,
  })
  name: string;
}
