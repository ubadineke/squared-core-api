import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string;

  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  contractAddress: string; // for ERC-20 tokens, etc.

  // Any other attributes relevant to the token
}
