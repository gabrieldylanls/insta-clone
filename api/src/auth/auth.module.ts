import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'adminadmin',
      signOptions: { expiresIn: 3600 },
    }),
    UserModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
  ],
})
export class AuthModule { }
