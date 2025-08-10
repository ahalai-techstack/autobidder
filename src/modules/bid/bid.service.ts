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
import { CreateBidDto } from './dto/create-bid.dto';

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

  async create(dto: CreateBidDto) {
    const [lot, user, topBid] = await Promise.all([
      this.lotService.findById(dto.lotId),
      this.userService.findOne(dto.userId),
      this.findTopBid(dto.lotId),
    ]);

    if (!lot) {
      throw new BadRequestException(`Lot with ID ${dto.lotId} not found`);
    }

    if (!user) {
      throw new BadRequestException(`User with ID ${dto.userId} not found`);
    }

    if (lot.startTime.getTime() >= new Date().getTime()) {
      throw new BadRequestException(
        `Bidding for lot ${lot.id} has not started yet`,
      );
    }

    if (lot.endTime.getTime() <= new Date().getTime()) {
      throw new BadRequestException(
        `Bidding for lot ${lot.id} has already ended`,
      );
    }

    if (topBid && dto.amountOfMoney <= topBid.amountOfMoney) {
      throw new BadRequestException(
        `Bid amount must be greater than the current top bid of ${topBid.amountOfMoney}`,
      );
    }

    const bid = this.bidRepository.create(dto);
    return await this.bidRepository.save(bid);
  }

  async findById(id: string) {
    const bid = await this.bidRepository.findOneBy({ id });
    return bid;
  }

  async findTopBid(lotId: string) {
    const topBid = await this.bidRepository
      .createQueryBuilder('bid')
      .where('bid.lotId = :lotId', { lotId })
      .orderBy('bid.amountOfMoney', 'DESC')
      .getOne();
    return topBid;
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
