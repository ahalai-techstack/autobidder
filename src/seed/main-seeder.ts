import { CarModel } from '../modules/car-model/car-model.entity';
import { CarBrand } from '../modules/car-brand/car-brand.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { User } from '../modules/user/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../modules/role/role.entity';
import { Lot } from '../modules/lot/lot.entity';

export default class MainSeeder implements Seeder {
  track?: boolean | undefined;
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const carBrandFactory = factoryManager.get(CarBrand);
    const savedCarBrands = await carBrandFactory.saveMany(10);

    const carModelsFactory = factoryManager.get(CarModel);
    const carModelsRepo = dataSource.getRepository(CarModel);
    const carModels = await Promise.all(
      Array(30)
        .fill(null)
        .map(async () => {
          const model = carModelsFactory.make({
            brand: faker.helpers.arrayElement(savedCarBrands),
          });
          return model;
        }),
    );

    const savedCarModels = await carModelsRepo.save(carModels);

    const roleFactory = factoryManager.get(Role);

    const userRole = await roleFactory.save({
      name: 'user',
      description: 'Regular user role',
    });
    const adminRole = await roleFactory.save({
      name: 'admin',
      description: 'Administrator role',
    });

    const usersFactory = factoryManager.get(User);
    const userRepo = dataSource.getRepository(User);
    const users = await Promise.all(
      Array(10)
        .fill(null)
        .map(async () => {
          const user = usersFactory.make({
            role: userRole,
            password: await bcrypt.hash('mypassword', 10),
          });
          return user;
        }),
    );

    const savedUsers = await userRepo.save(users);

    // Create admin user
    const adminUser = await usersFactory.make({
      email: 'admin@admin.com',
      firstName: 'Admin',
      lastName: 'User',
      role: adminRole,
      password: await bcrypt.hash('mypassword', 10),
    });
    await dataSource.getRepository(User).save(adminUser);

    // Create lots
    const lotFactory = factoryManager.get(Lot);
    const lotRepo = dataSource.getRepository(Lot);
    const lots = await Promise.all(
      Array(10)
        .fill(null)
        .map(async () => {
          const lot = lotFactory.make({
            owner: faker.helpers.arrayElement(savedUsers),
            model: faker.helpers.arrayElement(savedCarModels),
          });
          return lot;
        }),
    );
    await lotRepo.save(lots);
  }
}
