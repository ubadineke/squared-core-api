import { Wallet } from 'src/wallet/entities/wallet.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  googleId: string;

  @OneToOne(() => Wallet, { cascade: true, nullable: false })
  @JoinColumn()
  wallet: Wallet;

  // @BeforeInsert()
  // createWallet() {
  //   if (!this.wallet) {
  //     this.wallet = new Wallet();
  //   }
  // }
}
