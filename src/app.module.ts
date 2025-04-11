import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WalletModule } from './wallet/wallet.module';
import { GoogleService } from './google/google.service';

@Module({
  imports: [AuthModule, UsersModule, WalletModule],
  controllers: [AppController],
  providers: [AppService, GoogleService],
})
export class AppModule {}
