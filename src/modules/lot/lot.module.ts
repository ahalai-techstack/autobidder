import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LotSchema } from './lot.schema';
import { LotService } from './lot.service';
import { LotController } from './lot.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LotSchema])],
  providers: [LotService],
  controllers: [LotController],
})
export class LotModule {}
