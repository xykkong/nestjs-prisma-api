export const users: {
  name: string;
  password: string;
  email: string;
  profile: string;
}[] = [
  {
    name: 'Admin',
    password: 'adminpw',
    email: 'admin@mydomain.com',
    profile: 'admin',
  },
  {
    name: 'John',
    password: 'userpw',
    email: 'john@mydomain.com',
    profile: 'user',
  },
  {
    name: 'Chris',
    password: 'userpw',
    email: 'chris@mydomain.com',
    profile: 'user',
  },
  {
    name: 'Will',
    password: 'userpw',
    email: 'will@mydomain.com',
    profile: 'user',
  },
];

export const notes: {
  title: string;
  body: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}[] = [
  {
    title: 'Pay bills',
    body: 'Water and electricity',
    userId: 2,
    createdAt: new Date('2020-09-24'),
    updatedAt: new Date('2020-09-24'),
  },
  {
    title: 'Math Exam',
    body: 'Study chapter 1',
    userId: 2,
    createdAt: new Date('2020-10-30'),
    updatedAt: new Date('2021-03-20'),
  },
  {
    title: 'Go to the mall',
    body: 'buy gift for girlfriend',
    userId: 2,
    createdAt: new Date('2021-02-24'),
    updatedAt: new Date('2022-09-24'),
  },
  {
    title: 'English Exam',
    body: 'review grammar',
    userId: 3,
    createdAt: new Date('2022-09-14'),
    updatedAt: new Date('2022-10-24'),
  },
  {
    title: 'Visit Mom',
    body: 'ideas: book or chocolate',
    userId: 3,
    createdAt: new Date('2022-04-14'),
    updatedAt: new Date('2022-07-16'),
  },
  {
    title: 'Test mmhmm',
    body: 'Seems like an amazing app',
    userId: 4,
    createdAt: new Date('2022-09-29'),
    updatedAt: new Date('2022-10-11'),
  },
  {
    title: 'Test',
    body: 'Testing how this api works',
    userId: 4,
    createdAt: new Date('2021-12-25'),
    updatedAt: new Date('2022-01-01'),
  },
];
