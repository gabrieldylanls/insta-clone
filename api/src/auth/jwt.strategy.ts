import { UnauthorizedException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from './auth.service';
import { User } from '../user/interfaces/user.interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'adminadmin',
    });
  }

  public async validate(userData: User): Promise<User> {
    const user = await this.authService.validate(userData);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
