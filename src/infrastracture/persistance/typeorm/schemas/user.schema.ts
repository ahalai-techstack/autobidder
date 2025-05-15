import { User } from 'src/domain/entities/user.entity';
import { EntitySchema } from 'typeorm';
import { BaseColumns } from './base';

export const UserSchema = new EntitySchema<User>({
  name: 'user',
  tableName: 'users',
  target: User,
  columns: {
    ...BaseColumns,
    firstName: {
      type: 'varchar',
      length: 128,
      nullable: false,
    },
    lastName: {
      type: 'varchar',
      length: 128,
      nullable: false,
    },
    email: {
      type: 'varchar',
      length: 128,
      nullable: false,
      unique: true,
    },
    password: {
      type: 'varchar',
      length: 32,
      nullable: false,
    },
  },
});
