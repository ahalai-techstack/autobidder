import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { UserModule } from './modules/user/user.module';
import { Lot } from './modules/lot/lot.schema';
import { LotModule } from './modules/lot/lot.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CarBrandModule } from './modules/car-brand/car-brand.module';
import { Car } from './modules/car/car.entity';
import { CarModel } from './modules/car-model/car-model.entity';
import { CarModelModule } from './modules/car-model/car-model.module';
import { CarModule } from './modules/car/car.module';
import { CarBrand } from './modules/car-brand/car-brand.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DB_URL'),
        entities: [User, Lot, Car, CarModel, CarBrand],
        synchronize: true,
      }),
    }),
    UserModule,
    LotModule,
    AuthModule,
    CarBrandModule,
    CarModelModule,
    CarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
