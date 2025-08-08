import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { BidService } from './bid.service';
import { CreateBidDto } from './dto/create-bid.dto';

@Controller('bid')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const bid = await this.bidService.findById(id);
    if (!bid) {
      throw new NotFoundException(`Bid with ID ${id} not found`);
    }
    return bid;
  }

  @Get()
  async findAll() {
    return await this.bidService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateBidDto) {
    const { amountOfMoney, userId, lotId } = dto;
    return await this.bidService.create(amountOfMoney, userId, lotId);
  }
}
