import { User } from '../../../domain/entities/user.entity';
import { EntitySchema } from 'typeorm';
import { BaseColumns } from '../../../../schemas/base';

export const UserSchema = new EntitySchema<User>({
  name: 'user',
  tableName: 'users',
  columns: {
    ...BaseColumns,
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
      length: 256,
    },
  },
});
