import { CreateCarBrandDto } from './create-car-brand.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCarBrandDto extends PartialType(CreateCarBrandDto) {}
