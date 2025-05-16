import { User } from '../entities/user.entity';
import { EntitySchema } from 'typeorm';
import { BaseColumns } from 'src/infrastructure/persistence/typeorm/schemas/base';
import { BaseColumnSchemaPart } from 'src/entities/base.entity';

export const UserSchema = new EntitySchema<User>({
  name: 'user',
  tableName: 'users',
  columns: {
    ...BaseColumnSchemaPart,
    firstName: {
      type: 'varchar',
      length: 128,
    },
    lastName: {
      type: 'varchar',
      length: 128,
    },
    email: {
      type: 'varchar',
      length: 128,
      unique: true,
    },
    password: {
      type: 'varchar',
      length: 32,
    },
  },
});
