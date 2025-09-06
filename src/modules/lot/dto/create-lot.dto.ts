import { IsUUID, IsNumber, IsDateString } from 'class-validator';

export class CreateLotDto {
  @IsUUID()
  ownerId: string;

  @IsUUID()
  carId: string;

  @IsNumber()
  startPrice: number;

  @IsNumber()
  currentPrice: number;

  @IsDateString()
  startTime: Date;

  @IsDateString()
  endTime: Date;
}
