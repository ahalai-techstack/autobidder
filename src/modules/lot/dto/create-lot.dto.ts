import { IsUUID, IsNumber, IsDateString, IsString } from 'class-validator';

export class CreateLotDto {
  @IsUUID()
  ownerId: string;

  @IsUUID()
  brandId: string;

  @IsUUID()
  modelId: string;

  @IsNumber()
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
