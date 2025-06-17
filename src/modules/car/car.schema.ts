import { Car } from 'src/entities/car.entity';
import { EntitySchema } from 'typeorm';

export const CarSchema = new EntitySchema<Car>({
  name: 'car',
  tableName: 'cars',
  target: Car,
  columns: {
    carModelId: {
      primary: true,
      type: 'uuid',
      name: 'car_model_id',
      nullable: false,
    },
    yearOfManufacture: {
      type: 'integer',
      name: 'year_of_manufacture',
    },
  },
});
