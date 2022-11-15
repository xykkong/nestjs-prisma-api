import { PipeTransform, BadRequestException } from '@nestjs/common';

import { SignUpDto, SignUpSchema } from '../modules/auth/dto';

export class SignUpValidatorPipe implements PipeTransform<SignUpDto> {
  public transform(value: SignUpDto): SignUpDto {
    const result = SignUpSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
