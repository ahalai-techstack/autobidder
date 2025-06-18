import { Lot } from 'src/entities/lot.entity';

export class LotPolicy {
  static canUpdate(user: { userId: string; email: string }, lot: Lot): boolean {
    const isLotOwner = lot.ownerId === user.userId;
    return isLotOwner;
  }
}
