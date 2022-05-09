import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
  ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
