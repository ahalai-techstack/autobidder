import { Lot } from '../../modules/lot/lot.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Lot, (faker) => {
  const lot = new Lot();
  lot.vin = faker.vehicle.vin();
  lot.startPrice = faker.number.int({ min: 1000, max: 10000 });
  lot.startTime = faker.date.recent();
  lot.endTime = faker.date.future();
  return lot;
});
