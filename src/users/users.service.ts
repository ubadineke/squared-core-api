import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepository.create({ ...createUserDto });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOrCreate(email: string, googleId: string) {
    // let user =
    //   (await this.userRepository.findOne({ where: { email } })) ??
    //   (await this.userRepository.create({
    //     email,
    //     googleId,
    //     wallet: { tokenBalances: [] },
    //   }));

    // await this.userRepository.save(user);
    // user.wallet.user = user;

    let user = await this.userRepository.findOne({
      where: { email },
      relations: ['wallet', 'wallet.tokenBalances'],
    });

    if (!user) {
      // Create user with wallet and empty tokenBalances
      user = this.userRepository.create({
        email,
        googleId,
        wallet: {},
      });

      // Save the user first to get IDs
      await this.userRepository.save(user);

      // // Set the circular reference
      // user.wallet.user = user;
    }
    return user;
  }
}
