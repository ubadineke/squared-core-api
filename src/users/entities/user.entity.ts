import { Wallet } from 'src/wallet/entities/wallet.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  googleId: string;

  @OneToOne(() => Wallet)
  @JoinColumn()
  wallet: Wallet;
}
