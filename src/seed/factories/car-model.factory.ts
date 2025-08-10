import { CarModel } from '../../modules/car-model/car-model.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(CarModel, (faker) => {
  const carModel = new CarModel();
  carModel.name = faker.vehicle.model();
  return carModel;
});
