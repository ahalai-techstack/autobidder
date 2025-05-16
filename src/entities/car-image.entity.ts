import { Base } from './base.entity';

export class CarImage extends Base {
  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    public readonly url: string,
  ) {
    super(id, createdAt, updatedAt);
  }
}
