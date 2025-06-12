import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: RegisterUserDto) {
    const { password, firstName, lastName, email } = user;
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await this.userService.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashed,
    });

    const payload = { sub: newUser.id, email: newUser.email };
    const token = this.jwtService.sign(payload);
    return {
      accessToken: token,
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    };
  }
}
