import { Base } from './base.entity';

export class Bid extends Base {
  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    public readonly userId: string,
    public readonly lotId: string,
    public readonly amount: number,
  ) {
    super(id, createdAt, updatedAt);
  }
}
