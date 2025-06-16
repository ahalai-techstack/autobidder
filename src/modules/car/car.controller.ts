import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  async findAll() {
    return await this.carService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.carService.findById(id);
  }

  @Post()
  async create(@Body() dto: CreateCarDto) {
    return await this.carService.create(dto);
  }

  @Patch(':id')
  async update(
    @Body() dto: UpdateCarDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.carService.update(id, dto);
  }
}
