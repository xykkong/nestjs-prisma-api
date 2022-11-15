import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserService } from '../user';
import { UserDto } from '../user/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: User): Promise<{ access_token: string }> {
    const payload = {
      id: user.id,
      username: user.email,
      profile: user.profile,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
