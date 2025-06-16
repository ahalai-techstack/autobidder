import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from 'src/modules/car/dto/create-car.dto';

export class UpdateCarModelDto extends PartialType(CreateCarDto) {}
