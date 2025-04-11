import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { GoogleService } from 'src/google/google.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

interface Payload {
  id: number;
  email: string;
  googleId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly googleService: GoogleService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

  async generateJwt(payload: Payload) {
    return await this.jwtService.sign(
      { ...payload },
      {
        secret: this.configService.get<string>('JWT_SECRET') as string,
      },
    );
  }

  async delegatedGoogleAuth(idToken: string) {
    const googleUser = await this.googleService.verifyToken(idToken);
    // console.log('Google User', googleUser);

    if (!googleUser) {
      throw new BadRequestException('User not found');
    }

    const { email, sub: googleId } = googleUser;

    if (!email || !googleId)
      throw new BadRequestException('Google User Payload Incomplete');

    // Fetch Existing User if any else create user in DB
    let user = await this.usersService.findOrCreate(email, googleId);
    console.log(user);

    //Issue JWT for auth
    const payload = { id: user.id, email, googleId };
    const accessToken = await this.generateJwt(payload);

    console.log('Access TOken', accessToken);

    return { user, accessToken };
  }

  //Add app tracking(new schema, new field) e.g this.authService.linkAppToUser(user.id, app_id);
}
