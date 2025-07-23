import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  @Column({ name: 'car_model_id', type: 'uuid', nullable: false })
  carModelId: string;

  @Column({ name: 'year_of_manufacture', type: 'integer', nullable: true })
  yearOfManufacture: number;

  @Column({ type: 'varchar', length: 17, unique: true, nullable: true })
  vin: string;

  @Column({ type: 'int', nullable: true })
  mileage: number;
}
