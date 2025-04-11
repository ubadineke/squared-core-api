import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { TokenBalance } from 'src/wallet/entities/token.balance.entity';
import { Token } from 'src/wallet/entities/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wallet, Token, TokenBalance])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
