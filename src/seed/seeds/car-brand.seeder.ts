import { CarBrand } from '../../modules/car-brand/car-brand.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class CarBrandSeeder implements Seeder {
  track?: boolean | undefined;
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const carBrandFactory = factoryManager.get(CarBrand);
    const savedCarBrands = await carBrandFactory.saveMany(10);
    return savedCarBrands;
  }
}
