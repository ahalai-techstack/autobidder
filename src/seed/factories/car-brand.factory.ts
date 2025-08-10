import { CarBrand } from '../../modules/car-brand/car-brand.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(CarBrand, (faker) => {
  const carBrand = new CarBrand();
  carBrand.name = faker.vehicle.manufacturer();
  return carBrand;
});
