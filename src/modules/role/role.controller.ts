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
import { RoleService } from './role.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('roles')
@UseGuards(RolesGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @Roles('admin')
  async findAll() {
    return await this.roleService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.roleService.findById(id);
  }

  @Post()
  @Roles('admin')
  async create(@Body() dto: { name: string; description?: string }) {
    return await this.roleService.create(dto);
  }

  @Patch(':id')
  @Roles('admin')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: { name?: string; description?: string },
  ) {
    return await this.roleService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.roleService.delete(id);
    return { message: 'Role deleted successfully' };
  }
}
