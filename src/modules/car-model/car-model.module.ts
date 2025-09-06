import { Module } from '@nestjs/common';
import { CarModelController } from './car-model.controller';
import { CarModelService } from './car-model.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModelSchema } from './car-model.schema';

@Module({
  imports: [TypeOrmModule.forFeature([CarModelSchema])],
  controllers: [CarModelController],
  providers: [CarModelService],
})
export class CarModelModule {}
