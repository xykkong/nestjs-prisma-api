import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { users, notes } from './data';

const prisma = new PrismaClient();

const resetDb = async () => {
  await prisma.note.deleteMany();
  console.log('Cleaned all notes');

  await prisma.user.deleteMany();
  console.log('Cleaned all users');

  await prisma.$queryRaw`ALTER SEQUENCE "User_id_seq" RESTART;`;
  console.log('Reseted user_id_seq to 1');
}

const insertSeedData = async () => {
  for (const user of users) {
    const password = await bcrypt.hash(user.password, 10);
    await prisma.user.create({
      data: { ...user, password },
    });
  }
  console.log('Added seed data for users');

  for (const note of notes) {
    await prisma.note.create({
      data: { ...note },
    });
  }
  console.log('Added seed data for notes');
}

const load = async () => {
  try {
    await resetDb();
    await insertSeedData();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
