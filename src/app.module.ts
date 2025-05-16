import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './user/user.schema';
import { UserModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://postgres:postgres@db:5432/mydb',
      entities: [UserSchema],
      synchronize: true, // dev only
    }),

    UserModule,
  ],
})
export class AppModule {}
