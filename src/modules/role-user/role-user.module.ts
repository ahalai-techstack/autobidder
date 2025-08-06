import { Module } from '@nestjs/common';
import { RoleUserService } from './role-user.service';
import { RoleUserController } from './role-user.controller';
import { RoleUser } from './role-user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoleUser]), RoleModule],
  providers: [RoleUserService],
  controllers: [RoleUserController],
  exports: [RoleUserService],
})
export class RoleUserModule {}
