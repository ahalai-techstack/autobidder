import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lot } from 'src/entities/lot.entity';
import { LotSchema } from './lot.schema';

@Injectable()
export class LotService {
  constructor(
    @InjectRepository(LotSchema)
    private readonly lotRepository: Repository<Lot>,
  ) {}

  async findAll(): Promise<Lot[]> {
    return this.lotRepository.find();
  }

  async findById(id: string): Promise<Lot> {
    const lot = await this.lotRepository.findOneBy({ id });
    if (!lot) {
      throw new NotFoundException(`Lot with ID ${id} not found`);
    }
    return lot;
  }

  async create(data: Partial<Lot>): Promise<Lot> {
    const lot = this.lotRepository.create(data);
    return this.lotRepository.save(lot);
  }

  async update(id: string, data: Partial<Lot>): Promise<Lot> {
    const lot = await this.findById(id);
    const updated = this.lotRepository.merge(lot, data);
    return this.lotRepository.save(updated);
  }

  async delete(id: string): Promise<void> {
    const result = await this.lotRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Lot with ID ${id} not found`);
    }
  }
}
