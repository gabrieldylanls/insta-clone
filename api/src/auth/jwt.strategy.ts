import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from './auth.service';
import { User } from 'src/user/interfaces/user.interfaces';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'adminadmin',
    });
  }

  public async validate(userData: User): Promise<User> {
    const user = await this.authService.validateUser(userData);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}