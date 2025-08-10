import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RoleUserService } from 'src/modules/role-user/role-user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly roleUserService: RoleUserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default',
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const userId = payload?.sub;
    const userRoles = (
      await this.roleUserService.findUserRoles(payload.sub)
    ).map((role) => role.name);
    return { userId: userId, roles: userRoles };
  }
}
