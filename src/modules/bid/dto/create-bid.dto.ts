import { IsNumber, IsUUID } from 'class-validator';

export class CreateBidDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  amountOfMoney: number;

  @IsUUID()
  userId: string;

  @IsUUID()
  lotId: string;
}
