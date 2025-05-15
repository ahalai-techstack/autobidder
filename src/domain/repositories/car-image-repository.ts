import { CarImage } from '../entities/car-image.entity';

export interface ICarImageRepository {
  findById(id: string): Promise<CarImage | null>;
}
