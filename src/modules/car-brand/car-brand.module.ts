import { Module } from '@nestjs/common';
import { CarBrandController } from './car-brand.controller';
import { CarBrandService } from './car-brand.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarBrand } from './car-brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarBrand])],
  controllers: [CarBrandController],
  providers: [CarBrandService],
})
export class CarBrandModule {}
