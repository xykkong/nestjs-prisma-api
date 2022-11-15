import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { PrismaService } from '../../providers';
import { User } from '../user';

describe('NoteController', () => {
  let noteController: NoteController,
    noteService: NoteService,
    prismaService: PrismaService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [NoteService, PrismaService],
    }).compile();

    noteController = app.get<NoteController>(NoteController);
    noteService = app.get<NoteService>(NoteService);
    prismaService = app.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(noteController).toBeDefined();
    expect(noteService).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe('GET /note', () => {
    it('should return all notes for an admin', async () => {
      const user: User = {
        id: 1,
        name: "John",
        email: "john@mydomain.com",
        profile: "admin"
      }
      const notes = [
        {
          id: "67f22da9-5964-4b8f-b937-afc259374cf7",
          title: 'Go to mall',
          body: 'Buy gifts for family',
          userId: 1,
          createdAt: new Date('2022-09-14'),
          updatedAt: new Date('2022-10-24'),
        },
        {
          id: "0dfff29d-c39e-4e76-9855-bf512fba1814",
          title: 'Study for English Exam',
          body: 'TOEFL exam',
          userId: 2,
          createdAt: new Date('2022-04-14'),
          updatedAt: new Date('2022-07-16'),
        },
      ];

      jest.spyOn(noteService, 'listAll').mockImplementation(async () => notes);
      jest.spyOn(noteService, 'listByUser').mockImplementation(async () => [notes[0]]);
      const res = await noteController.listNote(user);
      expect(noteService.listAll).toBeCalledTimes(1);
      expect(noteService.listByUser).toBeCalledTimes(0);
      expect(res).toMatchObject(notes);
    });


    it('should return notes for a normal user', async () => {
      const user: User = {
        id: 1,
        name: "John",
        email: "john@mydomain.com",
        profile: "user"
      }
      const myNote = {
        id: "67f22da9-5964-4b8f-b937-afc259374cf7",
        title: 'Go to mall',
        body: 'Buy gifts for family',
        userId: 1,
        createdAt: new Date('2022-09-14'),
        updatedAt: new Date('2022-10-24'),
      }
      const otherNote = {
        id: "0dfff29d-c39e-4e76-9855-bf512fba1814",
        title: 'Study for English Exam',
        body: 'TOEFL exam',
        userId: 2,
        createdAt: new Date('2022-04-14'),
        updatedAt: new Date('2022-07-16'),
      }
      jest.spyOn(noteService, 'listAll').mockImplementation(async () => [myNote, otherNote]);
      jest.spyOn(noteService, 'listByUser').mockImplementation(async () => [myNote]);
      const res = await noteController.listNote(user);
      expect(noteService.listAll).toBeCalledTimes(0);
      expect(noteService.listByUser).toBeCalledTimes(1);
      expect(res).toMatchObject([myNote]);
    });

    describe('GET /note/${ID}', () => {
      it('should return note', async () => {
        const user: User = {
          id: 1,
          name: "John",
          email: "john@mydomain.com",
          profile: "user"
        }
        const note = {
          id: "67f22da9-5964-4b8f-b937-afc259374cf7",
          title: 'Go to mall',
          body: 'Buy gifts for family',
          userId: 1,
          createdAt: new Date('2022-09-14'),
          updatedAt: new Date('2022-10-24'),
        }

        jest.spyOn(noteService, 'find').mockImplementation(async () => note);
        const res = await noteController.getNote(user, note.id);
        expect(noteService.find).toHaveBeenCalledTimes(1);
        expect(res).toMatchObject(note);
      });


      it('should not return note from other user', async () => {
        const user: User = {
          id: 1,
          name: "John",
          email: "john@mydomain.com",
          profile: "user"
        }
        const note = {
          id: "67f22da9-5964-4b8f-b937-afc259374cf7",
          title: 'Go to mall',
          body: 'Buy gifts for family',
          userId: 2,
          createdAt: new Date('2022-09-14'),
          updatedAt: new Date('2022-10-24'),
        };

        jest.spyOn(noteService, 'find').mockImplementation(async () => note);
        const res = await noteController.getNote(user, note.id);
        expect(noteService.find).toHaveBeenCalledTimes(1);
        expect(res).toMatchObject(note);
      });
    });

    describe('POST /note', () => {
      it('should create new note', async () => {
        const user: User = {
          id: 1,
          name: "John",
          email: "john@mydomain.com",
          profile: "user"
        }
        const note = {
          id: "67f22da9-5964-4b8f-b937-afc259374cf7",
          title: 'Go to mall',
          body: 'Buy gifts for family',
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        jest
          .spyOn(noteService, 'create')
          .mockImplementation(async () => note);
        const noteCreated = await noteController.createNote(user, { title: note.title, body: note.body });
        expect(noteService.create).toHaveBeenCalledTimes(1);
        expect(noteService.create).toHaveBeenCalledWith({ title: note.title, body: note.body, userId: user.id });
        expect(noteCreated).toEqual(note);
      });
    });
  });
});
