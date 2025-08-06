import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Lot } from '../lot/lot.entity';

@Entity()
export class CarBrand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 128,
  })
  name: string;

  @OneToMany(() => Lot, (lot) => lot.brand)
  lots: Lot[];
}
