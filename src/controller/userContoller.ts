import { UserInfo } from '../types/types.js';

const users: UserInfo[] = [
  {
    id: '1',
    username: 'User 1',
    age: 5,
    hobbies: [],
  },
  {
    id: '2',
    username: 'User 2',
    age: 5,
    hobbies: ['no hobbies'],
  },
  {
    id: '3',
    username: 'User 3',
    age: 5,
    hobbies: ['1 hobbies'],
  },
  {
    id: '4',
    username: 'User 4',
    age: 5,
    hobbies: ['hobbies'],
  },
];

export const getUser = (userId: string | undefined): UserInfo[] => {
  if (!userId) return users;
  const result: UserInfo[] = [];
  users
    .filter((user: UserInfo) => user.id === userId)
    .forEach((user: UserInfo) => {
      result.push(user);
    });
  return result;
};
