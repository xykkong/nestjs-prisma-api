import { Injectable } from '@nestjs/common';
import { generateHash, validateHash } from '../../commons';
import { Prisma, PrismaService } from '../../providers';
import { UserDto } from './dto';
import { UserAlreadyExistException } from './exception';
import {
  UserNotFoundError,
  UserPassowordNotMatchError,
} from './exception/user.error';

export type User = any;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async list(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({ skip, take, cursor, where, orderBy });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(userDto: UserDto): Promise<User> {
    const { name, email, password } = userDto;
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new UserAlreadyExistException(existingUser.email);
    }
    const newUser = {
      name,
      email,
      password: await generateHash(password),
      profile: 'user',
    };
    return this.prisma.user.create({ data: newUser });
  }

  async validate(username: string, password: string) {
    const existingUser = await this.findByEmail(username);
    if (!existingUser) {
      throw new UserNotFoundError(username);
    }

    if (await validateHash(password, existingUser.password)) {
      existingUser.password = undefined;
      return existingUser;
    }
    throw new UserPassowordNotMatchError();
  }
}
