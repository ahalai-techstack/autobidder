import { Lot } from 'src/entities/lot.entity';
import { EntitySchema } from 'typeorm';
import { BaseColumns } from 'src/modules/schemas/base';

export const LotSchema = new EntitySchema<Lot>({
  name: 'lot',
  tableName: 'lots',
  columns: {
    ...BaseColumns,
    ownerId: {
      type: 'uuid',
      name: 'owner_id',
    },
    carId: {
      type: 'uuid',
      name: 'car_id',
    },
    startPrice: {
      type: 'decimal',
      name: 'start_price',
    },
    currentPrice: {
      type: 'decimal',
      name: 'current_price',
    },
    startTime: {
      type: 'timestamp with time zone',
      name: 'start_time',
    },
    endTime: {
      type: 'timestamp with time zone',
      name: 'end_time',
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
