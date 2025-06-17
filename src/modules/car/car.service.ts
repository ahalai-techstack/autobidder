import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CarSchema } from './car.schema';
import { Car } from 'src/entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarSchema)
    private readonly carRepository: Repository<Car>,
  ) {}

  async findAll(): Promise<Car[]> {
    return this.carRepository.find();
  }

  async findById(id: string): Promise<Car> {
    const car = await this.carRepository.findOneBy({ id });
    if (!car) {
      throw new Error(`Car with ID ${id} not found`);
    }
    return car;
  }

  async create(data: Partial<Car>): Promise<Car> {
    const car = this.carRepository.create(data);
    return await this.carRepository.save(car);
  }

  async update(id: string, data: Partial<Car>): Promise<Car> {
    const car = await this.findById(id);
    const updated = this.carRepository.merge(car, data);
    return await this.carRepository.save(updated);
  }

  async delete(id: string): Promise<void> {
    const result = await this.carRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Car with ID ${id} not found`);
    }
  }
}
