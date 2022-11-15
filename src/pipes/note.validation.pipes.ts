import { PipeTransform, BadRequestException } from '@nestjs/common';

import {
  CreateNoteDto,
  CreateNoteSchema,
  QueryNoteDto,
  QueryNoteSchema,
} from '../modules/note/dto';

export class CreateNoteValidatorPipe implements PipeTransform<CreateNoteDto> {
  public transform(value: CreateNoteDto): CreateNoteDto {
    const result = CreateNoteSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
