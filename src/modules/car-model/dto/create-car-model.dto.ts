import { IsString, IsUUID } from 'class-validator';

export class CreateCarModelDto {
  @IsUUID()
  brandId: string;

  @IsString()
  name: string;
}
