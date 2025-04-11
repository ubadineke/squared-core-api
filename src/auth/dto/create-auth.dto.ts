import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  app_id: string;

  @IsString()
  @IsNotEmpty()
  googleIdToken: string;
}
