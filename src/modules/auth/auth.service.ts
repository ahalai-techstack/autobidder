import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register.dto';
import { RoleUserService } from '../role-user/role-user.service';
import { RoleService } from '../role/role.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly roleUserService: RoleUserService,
    private readonly roleService: RoleService,
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

    const userRole = await this.roleService.findByName('user');

    if (userRole) {
      await this.roleUserService.create(newUser, userRole);
    }

    const payload = { sub: newUser.id };
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

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    };
  }
}
