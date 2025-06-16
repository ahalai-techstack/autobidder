import { EntitySchema } from 'typeorm';
import { CarBrand } from 'src/entities/car-brand';

export const CarBrandSchema = new EntitySchema<CarBrand>({
  name: 'car_brand',
  tableName: 'car_brands',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      name: 'id',
    },
    name: {
      type: 'varchar',
      length: 128,
    },
  },
});
