import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { LotService } from './lot.service';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLotDto) {
    return this.lotService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lotService.delete(id);
  }
}
