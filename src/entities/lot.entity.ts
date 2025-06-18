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
    public readonly startPrice: number,
    public readonly currentPrice: number,
    public readonly startTime: Date,
    public readonly endTime: Date,
    public readonly status: LotStatus,
    public readonly description?: string,
  ) {
    super(id, createdAt, updatedAt);
  }

  static create(
    ownerId: string,
    carId: string,
    startPrice: number,
    currentPrice: number,
    startTime: Date,
    endTime: Date,
    status: LotStatus = LotStatus.SCHEDULED,
  ): Lot {
    const id = crypto.randomUUID();
    const currentTime = new Date();
    return new Lot(
      id,
      currentTime,
      currentTime,
      ownerId,
      carId,
      startPrice,
      currentPrice,
      startTime,
      endTime,
      status,
    );
  }
}
