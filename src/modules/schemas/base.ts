import { EntitySchemaColumnOptions } from 'typeorm';

export const BaseColumns: Record<string, EntitySchemaColumnOptions> = {
  id: {
    type: 'uuid',
    generated: 'uuid',
    primary: true,
    unique: true,
  },
  createdAt: {
    type: 'timestamp with time zone',
    createDate: true,
    name: 'created_at',
  },
  updatedAt: {
    type: 'timestamp with time zone',
    updateDate: true,
    name: 'updated_at',
  },
};
