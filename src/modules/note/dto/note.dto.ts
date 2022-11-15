import * as Joi from 'joi';

export class CreateNoteDto {
  title: string;
  body: string;
}

export class QueryNoteDto {
  userId: number;
}

export class NoteDto {
  title?: string;
  body?: string;
  userId?: number;
}

export const CreateNoteSchema = Joi.object({
  title: Joi.string().max(100).required(),
  body: Joi.string().required(),
}).options({
  abortEarly: false,
});

export const QueryNoteSchema = Joi.object({
  userId: Joi.number(),
});
