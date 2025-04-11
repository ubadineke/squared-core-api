import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleService } from 'src/google/google.service';

@Module({
  controllers: [AuthController],
  providers: [GoogleService, AuthService],
})
export class AuthModule {}
