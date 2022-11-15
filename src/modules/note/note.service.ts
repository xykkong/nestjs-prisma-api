import { Injectable } from '@nestjs/common';
import { Note, Prisma } from '@prisma/client';
import { PrismaService } from '../../providers';
import { NoteDto } from './dto/note.dto';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) { }

  async listAll(): Promise<Note[]> {
    return this.prisma.note.findMany();
  }

  async listByUser(userId: number): Promise<Note[]> {
    console.log(userId)
    return this.prisma.note.findMany({ where: { userId } });
  }

  async find(
    id: string, userId: number,
  ): Promise<Note | null> {
    return this.prisma.note.findFirst({
      where: { id, userId },
    });
  }

  async create(data: NoteDto): Promise<Note> {
    const { title, body, userId } = data;
    return this.prisma.note.create({
      data: {
        title,
        body,
        user: {
          connect: {
            id: userId,
          }
        }
      }
    });
  }

  async update(id: string, data: NoteDto): Promise<Note> {
    const { title, body } = data;
    return this.prisma.note.update({ data: { title, body }, where: { id } });
  }

  async remove(id: string): Promise<Note> {
    return this.prisma.note.delete({ where: { id } });
  }
}
