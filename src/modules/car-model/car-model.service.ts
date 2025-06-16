import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarModelSchema } from './car-model.schema';
import { Repository } from 'typeorm';
import { CarModel } from 'src/entities/car-model';

@Injectable()
export class CarModelService {
  constructor(
    @InjectRepository(CarModelSchema)
    private readonly carModelRepository: Repository<CarModel>,
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

  async create(data: Partial<CarModel>): Promise<CarModel> {
    const existing = await this.carModelRepository.findOne({
      where: { name: data.name, brandId: data.brandId },
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
