import { IsUUID, IsDateString, IsString, IsPositive } from 'class-validator';

export class CreateLotDto {
  @IsUUID()
  ownerId: string;

  @IsUUID()
  modelId: string;

  @IsPositive()
  startPrice: number;

  @IsString()
  vin: string;

  @IsDateString({
    strict: true,
    strictSeparator: true,
  })
  startTime: string;

  @IsDateString({
    strict: true,
    strictSeparator: true,
  })
  endTime: string;
}
