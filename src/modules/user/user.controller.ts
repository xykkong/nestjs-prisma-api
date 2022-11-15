import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard, JwtAuthGuard } from '../../guards';
import { Roles } from '../../decorators';
import { Role } from '../../constants';
import { User, UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUsers(): Promise<User[]> {
    return await this.userService.list({});
  }
}
