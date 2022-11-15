import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Note, User as UserEntity } from '@prisma/client';
import { RolesGuard, JwtAuthGuard } from '../../guards';
import { Roles, User } from '../../decorators';
import { Role } from '../../constants';
import { NoteService } from './note.service';
import { CreateNoteValidatorPipe } from '../../pipes';
import { CreateNoteDto, QueryNoteDto } from './dto';
import { NoteNotFoundException } from './exception'

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.User, Role.Admin)
  async listNote(
    @User() user: UserEntity,
  ): Promise<Note[]> {
    if (user.profile === "admin")
      return this.noteService.listAll();
    return this.noteService.listByUser(user.id);
  }

  @Get(':id')
  @Roles(Role.User, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getNote(@User() user: UserEntity, @Param('id') id: string): Promise<Note> {
    const note = await this.noteService.find(id, user.id);
    if (!note)
      throw new NoteNotFoundException();
    return note
  }

  @Post()
  @Roles(Role.User, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createNote(@User() user: UserEntity, @Body(new CreateNoteValidatorPipe()) createNoteDto: CreateNoteDto): Promise<Note> {
    const { title, body } = createNoteDto;
    return this.noteService.create({
      title,
      body,
      userId: user.id,
    });
  }

  @Put(':id')
  @Roles(Role.User, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateNote(
    @User() user: UserEntity,
    @Param('id') id: string,
    @Body(new CreateNoteValidatorPipe()) createNoteDto: CreateNoteDto,
  ): Promise<Note> {
    const { title, body } = createNoteDto;
    const note = await this.noteService.find(id, user.id);
    if (!note) {
      throw new NoteNotFoundException();
    }
    return this.noteService.update(id, { title, body });
  }

  @Delete(':id')
  @Roles(Role.User, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async removeNote(@User() user: UserEntity, @Param('id') id: string): Promise<Note> {
    const note = await this.noteService.find(id, user.id);
    if (!note) {
      throw new NoteNotFoundException();
    }
    return this.noteService.remove(id);
  }
}
