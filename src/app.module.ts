import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './modules/user/user.schema';
import { UserModule } from './modules/user/user.module';
import { LotSchema } from './modules/lot/lot.schema';
import { LotModule } from './modules/lot/lot.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CarBrandModule } from './modules/car-brand/car-brand.module';
import { CarBrandSchema } from './modules/car-brand/car-brand.schema';
import { CarSchema } from './modules/car/car.schema';
import { CarModelSchema } from './modules/car-model/car-model.schema';
import { CarModelModule } from './modules/car-model/car-model.module';
import { CarModule } from './modules/car/car.module';

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
        entities: [
          UserSchema,
          LotSchema,
          CarBrandSchema,
          CarSchema,
          CarModelSchema,
        ],
        synchronize: true,
      }),
    }),
    UserModule,
    LotModule,
    AuthModule,
    CarBrandModule,
    CarModelModule,
<<<<<<< HEAD
=======
    CarModule,
>>>>>>> feat/authorization
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
