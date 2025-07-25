import { Module } from '@nestjs/common';
import { CarBrandController } from './car-brand.controller';
import { CarBrandService } from './car-brand.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarBrand } from './car-brand.entity';
import { RoleService } from '../role/role.service';
import { Role } from '../role/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarBrand, Role])],
  controllers: [CarBrandController],
  providers: [CarBrandService, RoleService],
})
export class CarBrandModule {}
