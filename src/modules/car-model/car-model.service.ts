import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarModel } from './car-model.entity';
import { Repository } from 'typeorm';
import { CarBrand } from '../car-brand/car-brand.entity';

@Injectable()
export class CarModelService {
  constructor(
    @InjectRepository(CarModel)
    private readonly carModelRepository: Repository<CarModel>,
    @InjectRepository(CarBrand)
    private readonly carBrandRepository: Repository<CarBrand>,
  ) {}

  async findAll(): Promise<CarModel[]> {
    return this.carModelRepository.find();
  }

  async findById(id: string): Promise<CarModel> {
    const carModel = await this.carModelRepository.findOneBy({ id });
    if (!carModel) {
      throw new Error(`Car model with ID ${id} not found`);
    }
    return carModel;
  }

  async create(data: { name: string; brandId: string }): Promise<CarModel> {
    const brand = await this.carBrandRepository.findOneBy({ id: data.brandId });

    if (!brand) {
      throw new Error(`Car brand with ID ${data.brandId} not found`);
    }

    const existing = await this.carModelRepository.findOne({
      where: { name: data.name, brand: { id: data.brandId } },
    });

    if (existing) {
      throw new Error(
        `Car model with name ${data.name} for brand ID ${data.brandId} already exists`,
      );
    }

    const carModel = this.carModelRepository.create(data);
    return await this.carModelRepository.save(carModel);
  }

  async update(id: string, data: Partial<CarModel>): Promise<CarModel> {
    const carModel = await this.findById(id);
    const updated = this.carModelRepository.merge(carModel, data);
    return await this.carModelRepository.save(updated);
  }

  async delete(id: string): Promise<void> {
    const result = await this.carModelRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Car model with ID ${id} not found`);
    }
  }
}
