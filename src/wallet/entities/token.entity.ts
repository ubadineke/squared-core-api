import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Wallet } from './wallet.entity';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string;

  @Column('decimal', { precision: 18, scale: 8 })
  balance: number; // The balance of the specific token in the wallet

  @ManyToOne(() => Wallet, (wallet) => wallet.tokenBalances)
  wallet: Wallet; // A wallet can have multiple token balances
}
