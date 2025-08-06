import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lot } from './lot.entity';
import { LotService } from './lot.service';
import { LotController } from './lot.controller';
import { CarModelModule } from '../car-model/car-model.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lot]), CarModelModule],
  providers: [LotService],
  controllers: [LotController],
})
export class LotModule {}
