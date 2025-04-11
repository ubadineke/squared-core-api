import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleService {
  private readonly client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(); //add-client-id if necessary
  }

  async verifyToken(idToken: string) {
    const ticket = await this.client
      .verifyIdToken({
        idToken,
      })
      .catch((error) => {
        throw new BadRequestException({
          message: 'Invalid ID Token',
          error: error?.message || 'Token verification failed',
        });
      });
    return ticket.getPayload();
  }
}
