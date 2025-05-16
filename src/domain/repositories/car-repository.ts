import { Car } from '../../entities/car.entity';

export interface CarRepository {
  findById(id: string): Promise<Car | null>;
}
