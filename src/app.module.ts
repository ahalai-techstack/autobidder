import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './modules/user/user.schema';
import { UserModule } from './modules/user/user.module';
import { LotSchema } from './modules/lot/lot.shema';
import { LotModule } from './modules/lot/lot.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
        entities: [UserSchema, LotSchema],
        synchronize: true,
      }),
    }),
    UserModule,
    LotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
