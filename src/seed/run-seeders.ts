import { runSeeders, SeederOptions } from 'typeorm-extension';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CarBrand } from '../modules/car-brand/car-brand.entity';
import { Lot } from '../modules/lot/lot.entity';
import { CarModel } from '../modules/car-model/car-model.entity';
import { User } from '../modules/user/user.entity';
import { Bid } from '../modules/bid/bid.entity';
import { Role } from '../modules/role/role.entity';
import CarBrandFactory from './factories/car-brand.factory';
import CarModelFactory from './factories/car-model.factory';
import MainSeeder from './main-seeder';
import userFactory from './factories/user.factory';
import roleFactory from './factories/role.factory';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: 'postgres://postgres:postgres@localhost:9000/mydb',
  entities: [CarBrand, Lot, CarModel, User, Bid, Role],
  seeds: [MainSeeder],
  factories: [CarBrandFactory, CarModelFactory, userFactory, roleFactory],
};

export const dataSource = new DataSource(options);
dataSource
  .initialize()
  .then(async () => {
    try {
      await dataSource.synchronize(true);
      console.log('Running seeders...');
      await runSeeders(dataSource);
      console.log('Seeding completed');
    } catch (error) {
      console.error('Seeding error:', error);
    } finally {
      process.exit();
    }
  })
  .catch((err) => {
    console.error('DataSource initialization error:', err);
    process.exit(1);
  });
