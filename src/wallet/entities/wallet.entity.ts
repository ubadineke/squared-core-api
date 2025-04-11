import { User } from 'src/users/entities/user.entity';
import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Token } from './token.entity';

export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ default: 0 })
  nairaBalance: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  lastUpdated: Date; // Keep track of the last time the wallet was updated.

  @OneToMany(() => Token, (token) => token.wallet)
  tokenBalances: Token[];
}
