import { Base } from './base.entity';

export enum LotStatus {
  SCHEDULED = 'SCHEDULED',
  OPEN = 'OPEN',
  CLOSING = 'CLOSING',
  SOLD = 'SOLD',
  CANCELLED = 'CANCELLED',
}

export class Lot extends Base {
  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    public readonly ownerId: string,
    public readonly carId: string,
    public readonly startPice: number,
    public readonly currentPrice: number,
    public readonly startTime: Date,
    public readonly endTime: Date,
    public readonly status: LotStatus,
  ) {
    super(id, createdAt, updatedAt);
  }
}
