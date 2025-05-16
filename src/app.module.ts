import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './modules/user/user.schema';
import { UserModule } from './modules/user/user.module';
import { LotSchema } from './modules/lot/lot.shema';
import { LotModule } from './modules/lot/lot.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://postgres:postgres@db:5432/mydb',
      entities: [UserSchema, LotSchema],
      synchronize: true,
    }),
    UserModule,
    LotModule,
  ],
})
export class AppModule {}
