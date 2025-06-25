import { Optional } from '@nestjs/common';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class UpdateCarDto {
  @IsNumber()
  @Optional()
  yearOfManufacture: number;

  @IsUUID()
  @Optional()
  carModelId: string;

  @IsString()
  @Optional()
  brandId: string;
}
