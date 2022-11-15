import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../providers';
import { NoteService } from './note.service';
import { UserService } from '../user';

describe('UserService', () => {
  let noteService: NoteService,
    userService: UserService,
    prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteService, UserService, PrismaService],
    }).compile();

    noteService = module.get<NoteService>(NoteService);
    prismaService = module.get<PrismaService>(PrismaService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(noteService).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(userService).toBeDefined();
  });
});
