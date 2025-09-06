import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarBrandService } from './car-brand.service';
import { CreateCarBrandDto } from './dto/create-car-brand.dto';

@Controller('car-brands')
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
  async create(@Body() dto: CreateCarBrandDto) {
    return await this.carBrandService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: CreateCarBrandDto,
  ) {
    return await this.carBrandService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.carBrandService.delete(id);
  }
}
