import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsUUID()
  brandId: string;

  @IsString()
  @IsUUID()
  carModelId: string;

  @IsNumber()
  yearOfManufacture: number;
}
