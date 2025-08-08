import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lot } from './lot.entity';
import { ICreateLot } from './types';
import { CarModelService } from '../car-model/car-model.service';
import { BidService } from '../bid/bid.service';

@Injectable()
export class LotService {
  constructor(
    @InjectRepository(Lot)
    private readonly lotRepository: Repository<Lot>,
    @Inject(forwardRef(() => BidService))
    private readonly bidService: BidService,
    private readonly carModelService: CarModelService,
  ) {}

  async findAll(): Promise<Lot[]> {
    return this.lotRepository.find();
  }

  async findById(id: string): Promise<Lot | null> {
    const lot = await this.lotRepository.findOneBy({ id });
    return lot;
  }

  async findWinnerBid(id: string) {
    const bid = await this.bidService.findTopBidByLotId(id);
    return bid;
  }

  async create(data: ICreateLot): Promise<Lot> {
    const { brandId } = data;
    const isModelValid = await this.carModelService.hasBrandId(brandId);

    if (!isModelValid) {
      throw new Error('The car brand does have such a car model');
    }

    const lot = this.lotRepository.create(data);
    return this.lotRepository.save(lot);
  }

  async update(id: string, data: Partial<Lot>): Promise<Lot> {
    const lot = await this.findById(id);
    if (!lot) {
      throw new Error('Lot not found');
    }
    const updated = this.lotRepository.merge(lot, data);
    return this.lotRepository.save(updated);
  }

  async delete(id: string): Promise<void> {
    const result = await this.lotRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Lot with ID ${id} not found`);
    }
  }

  async updateTopBidId(bidId: string, lot: Lot): Promise<Lot> {
    try {
      // Use update method for atomic operation
      await this.lotRepository.update(lot.id, { topBidId: bidId });

      // Return the updated lot
      const updatedLot = await this.findById(lot.id);
      if (!updatedLot) {
        throw new NotFoundException(
          `Lot with ID ${lot.id} not found after update`,
        );
      }

      return updatedLot;
    } catch (error) {
      throw new Error(
        `Failed to update topBidId for lot ${lot.id}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }
}
