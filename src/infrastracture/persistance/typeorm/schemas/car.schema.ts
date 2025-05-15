import { Car } from 'src/domain/entities/car.entity';
import { EntitySchema } from 'typeorm';
import { BaseColumns } from './base';

export const CarSchema = new EntitySchema<Car>({
  name: 'car',
  tableName: 'cars',
  target: Car,
  columns: {
    ...BaseColumns,
    carModelId: {
      type: 'uuid',
      name: 'car_model_id',
      nullable: false,
    },
    mileage: {
      type: 'number',
    },
    vin: {
      type: 'varchar',
      length: 17,
      unique: true,
    },
    yearOfManufacture: {
      type: 'number',
      name: 'year_of_manufacture',
    },
  },
});
