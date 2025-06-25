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
import { CarModelService } from './car-model.service';
import { CreateCarModelDto } from './dto/create-car-model.dto';
import { UpdateCarModelDto } from './dto/update-car-model.dto';

@Controller('car-models')
export class CarModelController {
  constructor(private readonly carModelService: CarModelService) {}

  @Get()
  async findAll() {
    return await this.carModelService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.carModelService.findById(id);
  }

  @Post()
  async create(@Body() dto: CreateCarModelDto) {
    return await this.carModelService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateCarModelDto,
  ) {
    return await this.carModelService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.carModelService.delete(id);
  }
}
