import { User } from 'src/users/entities/user.entity';
import {
  Column,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';
import { Token } from './token.entity';
import { TokenBalance } from './token.balance.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.wallet, { eager: true }) // One wallet belongs to one user
  user: User;

  @Column({ default: 0 })
  nairaBalance: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  lastUpdated: Date; // Keep track of the last time the wallet was updated.

  @OneToMany(() => TokenBalance, (tokenBalance) => tokenBalance.wallet)
  tokenBalances: Token[];
}
