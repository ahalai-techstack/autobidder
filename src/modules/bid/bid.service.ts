import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bid } from './bid.entity';
import { Repository } from 'typeorm';
import { LotService } from '../lot/lot.service';
import { UserService } from '../user/user.service';

@Injectable()
export class BidService {
  constructor(
    @InjectRepository(Bid) private readonly bidRepository: Repository<Bid>,
    @Inject(forwardRef(() => LotService))
    private readonly lotService: LotService,
    private readonly userService: UserService,
  ) {}

  async findAll() {
    const bids = await this.bidRepository.find();
    return bids;
  }

  async findById(id: string) {
    const bid = await this.bidRepository.findOneBy({ id });
    return bid;
  }

  async findAllByLotId(lotId: string) {
    const bids = await this.bidRepository.findBy({
      lotId,
    });
    return bids;
  }

  async findTopBidByLotId(lotId: string) {
    const bids = await this.findAllByLotId(lotId);

    if (!bids.length) {
      return null;
    }

    let topBid = bids[0];
    bids.map((bid) => {
      if (bid.amountOfMoney > topBid.amountOfMoney) {
        topBid = bid;
      }
    });
    return topBid;
  }
}
