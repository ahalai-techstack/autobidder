import { Module } from '@nestjs/common';
import { CarModelController } from './car-model.controller';
import { CarModelService } from './car-model.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModel } from './car-model.entity';
import { CarBrand } from '../car-brand/car-brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarModel, CarBrand])],
  controllers: [CarModelController],
  providers: [CarModelService],
  exports: [CarModelService],
})
export class CarModelModule {}
