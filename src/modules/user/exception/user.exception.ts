import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super('User not found');
  }
}

export class UserAlreadyExistException extends ConflictException {
  constructor(email: string) {
    super(`User with the same email (${email}) already exists!`);
  }
}
