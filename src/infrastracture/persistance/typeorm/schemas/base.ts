import { EntitySchemaColumnOptions } from 'typeorm';

export const BaseColumns: Record<string, EntitySchemaColumnOptions> = {
  id: {
    type: 'uuid',
    unique: true,
    nullable: false,
  },
  createdAt: {
    type: 'time with time zone',
    createDate: true,
    name: 'created_at',
  },
  updatedAt: {
    type: 'time with time zone',
    updateDate: true,
    name: 'updated_at',
  },
};
