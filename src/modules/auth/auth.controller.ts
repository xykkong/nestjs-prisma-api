import {
  Controller,
  Post,
  Request,
  UseGuards,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../../guards';
import { SignUpDto } from './dto';
import { User as UserEntity } from '@prisma/client';
import { User } from '../../decorators';
import { UserService } from '../user';
import { catchError } from 'rxjs';
import { UserAlreadyExistException } from '../user/exception';
import { UserNotFoundError } from '../user/exception/user.error';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@User() user: UserEntity) {
    return this.authService.signIn(user);
  }

  @Post('signup')
  async signUp(@Body() userData: SignUpDto) {
    try {
      const user = await this.userService.create({
        ...userData,
        profile: 'user',
      });
      return { ...user, id: undefined };
    } catch (e: any) {
      if (e instanceof UserNotFoundError)
        return new UserAlreadyExistException(userData.email);
      return new BadRequestException();
    }
  }
}
