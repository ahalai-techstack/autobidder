import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from './bid.entity';
import { LotModule } from '../lot/lot.module';
import { BidService } from './bid.service';
import { BidController } from './bid.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bid]),
    forwardRef(() => LotModule),
    UserModule,
  ],
  providers: [BidService],
  controllers: [BidController],
  exports: [BidService],
})
export class BidModule {}
