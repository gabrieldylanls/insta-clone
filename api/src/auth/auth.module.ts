import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

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
    UserService,
  ],
})
export class AuthModule { }
