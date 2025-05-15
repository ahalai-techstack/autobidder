import { CarImage } from 'src/domain/entities/car-image.entity';
import { EntitySchema } from 'typeorm';
import { BaseColumns } from './base';

export const CarImageSchema = new EntitySchema<CarImage>({
  name: 'carImage',
  tableName: 'car_images',
  target: CarImage,
  columns: {
    ...BaseColumns,
    url: {
      type: 'string',
      nullable: false,
    },
  },
});
