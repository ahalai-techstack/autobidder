import { InjectRepository } from '@nestjs/typeorm';
import { CarBrand } from 'src/entities/car-brand';
import { Repository } from 'typeorm';
import { CarBrandSchema } from './car-brand.schema';

export class CarBrandService {
  constructor(
    @InjectRepository(CarBrandSchema)
    private readonly carBrandRepository: Repository<CarBrand>,
  ) {}

  async findAll(): Promise<CarBrand[]> {
    return this.carBrandRepository.find();
  }

  async findById(id: string): Promise<CarBrand> {
    const carBrand = await this.carBrandRepository.findOneBy({ id });
    if (!carBrand) {
      throw new Error(`Car brand with ID ${id} not found`);
    }
    return carBrand;
  }

  async create(data: Partial<CarBrand>): Promise<CarBrand> {
    const existing = await this.carBrandRepository.findOne({
      where: { name: data.name },
    });

    if (existing) {
      throw new Error(`Car brand with name ${data.name} already exists`);
    }

    const carBrand = this.carBrandRepository.create(data);
    return await this.carBrandRepository.save(carBrand);
  }

  async update(id: string, data: Partial<CarBrand>): Promise<CarBrand> {
    const carBrand = await this.findById(id);
    const updated = this.carBrandRepository.merge(carBrand, data);
    return await this.carBrandRepository.save(updated);
  }

  async delete(id: string): Promise<void> {
    const result = await this.carBrandRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Car brand with ID ${id} not found`);
    }
  }

  async findByName(name: string): Promise<CarBrand[]> {
    return this.carBrandRepository.find({ where: { name } });
  }
}
