import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LotService } from './lot.service';
import { CreateLotDto } from './dto/create-lot.dto';

@Controller('lots')
export class LotController {
  constructor(private readonly lotService: LotService) {}

  @Get()
  findAll() {
    return this.lotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lotService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateLotDto) {
    return this.lotService.create(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lotService.delete(id);
  }
}
