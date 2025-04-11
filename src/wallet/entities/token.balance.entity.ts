import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Wallet } from './wallet.entity';
import { Token } from './token.entity';

@Entity()
export class TokenBalance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string;

  @Column('decimal', { precision: 18, scale: 8, default: 0 })
  balance: number; // The balance of the specific token in the wallet

  @ManyToOne(() => Token, { eager: true }) // Reference the token definition
  token: Token;

  @ManyToOne(() => Wallet, (wallet) => wallet.tokenBalances)
  wallet: Wallet; // A wallet can have multiple token balances
}
