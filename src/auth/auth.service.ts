import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { GoogleService } from 'src/google/google.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly googleService: GoogleService,
    // private readonly usersService: UsersService,
    // private readonly jwtService: JwtService,
  ) {}

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async delegatedGoogleAuth(idToken: string) {
    const googleUser = await this.googleService.verifyToken(idToken);
    console.log('Google User', googleUser);
  }
}
