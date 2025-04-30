import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CarEntity } from '../cars/car.entity';

@Entity('car_images')
export class CarImageEntity extends BaseEntity {
  @ManyToOne(() => CarEntity, (car) => car.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'car_id' })
  car: CarEntity;

  @Column({ type: 'text' })
  url: string;
}
