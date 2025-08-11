import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { BidService } from './bid.service';
import { CreateBidDto } from './dto/create-bid.dto';

@Controller('bid')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Get('top')
  async findTopBid(@Query('lotId', new ParseUUIDPipe()) lotId: string) {
    const bid = await this.bidService.findTopBid(lotId);
    if (!bid) {
      throw new NotFoundException(`No bids found for lot ID ${lotId}`);
    }
    return bid;
  }

  @Get('lot')
  findBidsOfLot(@Query('lotId', new ParseUUIDPipe()) lotId: string) {
    return this.bidService.findAllByLotId(lotId);
  }

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
    return await this.bidService.create(dto);
  }
}
