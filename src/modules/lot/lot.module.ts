import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lot } from './lot.entity';
import { LotService } from './lot.service';
import { LotController } from './lot.controller';
import { CarModelModule } from '../car-model/car-model.module';
import { BidModule } from '../bid/bid.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lot]),
    CarModelModule,
    forwardRef(() => BidModule),
  ],
  providers: [LotService],
  controllers: [LotController],
  exports: [LotService],
})
export class LotModule {}
