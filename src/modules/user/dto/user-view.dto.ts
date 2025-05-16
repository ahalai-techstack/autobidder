export class UserViewDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserViewDto>) {
    Object.assign(this, partial);
  }
}
