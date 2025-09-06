import { Module } from '@nestjs/common';
import { CarBrandController } from './car-brand.controller';
import { CarBrandService } from './car-brand.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarBrandSchema } from './car-brand.schema';

@Module({
  imports: [TypeOrmModule.forFeature([CarBrandSchema])],
  controllers: [CarBrandController],
  providers: [CarBrandService],
})
export class CarBrandModule {}
