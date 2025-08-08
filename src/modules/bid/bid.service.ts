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

  async create(amountOfMoney: number, userId: string, lotId: string) {
    const [lot, user] = await Promise.all([
      this.lotService.findById(lotId),
      this.userService.findOne(userId),
    ]);

    if (!lot) {
      throw new Error(`Lot with id ${lotId} not found`);
    }

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    const isLotActive =
      new Date().getTime() >= lot.startTime.getTime() &&
      new Date().getTime() <= lot.endTime.getTime();

    if (!isLotActive) {
      throw new BadRequestException('Lot is not active');
    }

    const currentTopBid = await this.findTopBidByLotId(lotId);

    // First, save the bid to get the ID
    const bid = this.bidRepository.create({
      amountOfMoney,
      userId,
      lotId,
    });
    const savedBid = await this.bidRepository.save(bid);

    const isNewTopBid =
      currentTopBid && amountOfMoney > +currentTopBid.amountOfMoney;
    console.log({ isNewTopBid });

    if (!isNewTopBid) {
      throw new BadRequestException(
        'New bid should be higher than the current top bid',
      );
    }
    return await this.lotService.updateTopBidId(savedBid.id, lot);
  }
}
