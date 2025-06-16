import { CarModel } from 'src/entities/car-model';
import { EntitySchema } from 'typeorm';

export const CarModelSchema = new EntitySchema<CarModel>({
  name: 'car_model',
  tableName: 'car_models',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      name: 'id',
    },
    brandId: {
      type: 'uuid',
      name: 'brand_id',
    },
    name: {
      type: 'varchar',
      length: 128,
    },
  },
});
