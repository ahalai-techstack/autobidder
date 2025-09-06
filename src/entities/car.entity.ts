import { EntitySchema } from 'typeorm';
import { Base } from './base.entity';
import { BaseColumns } from 'src/modules/schemas/base';

export class Car extends Base {
  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    public readonly brandId: string,
    public readonly carModelId: string,
    public readonly yearOfManufacture: number,
    // public readonly vin: string,
    // public readonly mileage: string,
  ) {
    super(id, createdAt, updatedAt);
  }
}

export const CarEntity = new EntitySchema<Car>({
  name: 'car',
  columns: {
    ...BaseColumns,
    // mileage: {
    //   type: 'number',
    // },
    // vin: {
    //   type: 'varchar',
    //   length: 17,
    //   unique: true,
    // },
    yearOfManufacture: {
      type: 'number',
    },
  },
});
