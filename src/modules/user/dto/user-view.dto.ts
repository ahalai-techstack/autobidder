export class UserViewDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  password?: string;

  constructor(partial) {
    delete partial.password;
    Object.assign(this, partial);
  }
}
