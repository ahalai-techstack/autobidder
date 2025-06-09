import { Bid } from 'src/entities/bid.entity';
import { EntitySchema } from 'typeorm';
import { BaseColumns } from './base';

export const BidSchema = new EntitySchema<Bid>({
  name: 'bid',
  tableName: 'bids',
  target: Bid,
  columns: {
    ...BaseColumns,
    userId: {
      type: 'uuid',
      name: 'user_id',
      nullable: false,
    },
    lotId: {
      type: 'uuid',
      name: 'lot_id',
      nullable: false,
    },
    amount: {
      type: 'number',
      nullable: false,
    },
  },
});
