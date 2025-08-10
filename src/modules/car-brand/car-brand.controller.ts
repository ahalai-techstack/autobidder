import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CarBrandService } from './car-brand.service';
import { CreateCarBrandDto } from './dto/create-car-brand.dto';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('car-brands')
@UseGuards(RolesGuard)
export class CarBrandController {
  constructor(private readonly carBrandService: CarBrandService) {}

  @Get()
  async findAll() {
    return await this.carBrandService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.carBrandService.findById(id);
  }

  @Post()
  // @Roles('admin', 'manager')
  async create(@Body() dto: CreateCarBrandDto) {
    return await this.carBrandService.create(dto);
  }

  @Patch(':id')
  // @Roles('admin')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: CreateCarBrandDto,
  ) {
    return await this.carBrandService.update(id, dto);
  }

  @Delete(':id')
  // @Roles('admin')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.carBrandService.delete(id);
  }
}
