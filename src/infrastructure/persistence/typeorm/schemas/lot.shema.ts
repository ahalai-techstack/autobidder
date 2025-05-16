import { Lot } from 'src/entities/lot.entity';
import { EntitySchema } from 'typeorm';
import { BaseColumns } from './base';

export const LotSchema = new EntitySchema<Lot>({
  name: 'lot',
  tableName: 'lots',
  target: Lot,
  columns: {
    ...BaseColumns,
    ownerId: {
      type: 'uuid',
      name: 'owner_id',
      nullable: false,
    },
    carId: {
      type: 'uuid',
      name: 'car_id',
      nullable: false,
    },
    startPice: {
      type: 'number',
      name: 'start_price',
      nullable: false,
    },
    currentPrice: {
      type: 'number',
      name: 'current_price',
      nullable: false,
    },
    startTime: {
      type: 'time with time zone',
      name: 'start_time',
      nullable: false,
    },
    endTime: {
      type: 'time with time zone',
      name: 'end_time',
      nullable: false,
    },
  },
  checks: [
    {
      name: 'CHK_lot_end_after_start',
      expression: '"end_time" > "start_time"',
    },
    {
      name: 'CHK_lot_current_more_or_equal_start_price',
      expression: '"current_price" >= "start_price"',
    },
  ],
});
