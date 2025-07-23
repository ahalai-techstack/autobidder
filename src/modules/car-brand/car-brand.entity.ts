import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CarBrand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 128,
  })
  name: string;
}
