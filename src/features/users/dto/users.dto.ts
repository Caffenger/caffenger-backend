export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

export class UpdateUserDto {
  email: string;
  name: string;
}
