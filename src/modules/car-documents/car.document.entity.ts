import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CarEntity } from '../cars/car.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('car_documents')
export class CarDocumentEntity extends BaseEntity {
  @ManyToOne(() => CarEntity, (car) => car.documents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'car_id' })
  car: CarEntity;

  @Column({ type: 'text' })
  type: string;

  @Column({ name: 'file_url', type: 'text' })
  fileUrl: string;
}
