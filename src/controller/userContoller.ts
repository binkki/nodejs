import { v4, validate } from 'uuid';
import { UserInfo } from '../types/types.js';

let users: UserInfo[] = [
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

const validateIdUuid = (id: string): boolean => {
  let result = false;
  try {
    validate(id);
    result = true;
  } catch (error) {
    console.log(error);
  }
  return result;
};

export const getUser = (userId: string | undefined): { code: number; data: UserInfo[] } => {
  if (!userId)
    return {
      code: 200,
      data: users,
    };
  const validateId = validateIdUuid(userId);
  if (!validateId) {
    return {
      code: 400,
      data: [],
    };
  }
  const result: UserInfo[] = [];
  users
    .filter((user: UserInfo) => user.id === userId)
    .forEach((user: UserInfo) => {
      result.push(user);
    });
  return {
    code: result.length === 1 ? 200 : 404,
    data: result,
  };
};

export const addUser = (data: string): Partial<UserInfo> => {
  let result: Partial<UserInfo> = { id: '' };
  let isValidUser = true;
  try {
    const newUser = JSON.parse(data);
    let username = '';
    let age = 0;
    let hobbies: string[] = Array();
    Object.keys(newUser).forEach((key: string) => {
      switch (key) {
        case 'username':
          username = newUser['username'];
          break;
        case 'age':
          age = Number(newUser['age']);
          break;
        case 'hobbies': {
          const userHobby = newUser['hobbies'];
          userHobby.forEach((hobby: string) => hobbies.push(hobby));
          break;
        }
        default:
          isValidUser = false;
      }
    });
    const parsedUser = {
      id: v4(),
      username,
      age,
      hobbies,
    };
    if (isValidUser && username !== '' && !Number.isNaN(age)) {
      users.push(parsedUser);
      result = users[users.length - 1];
    }
  } catch (error) {
    console.log(error);
  }
  return result;
};

export const deleteUser = (userId: string | undefined): number => {
  if (!userId || !validateIdUuid(userId)) return 400;
  const filteredUsers = users.filter((user: UserInfo) => user.id !== userId);
  if (users.length === filteredUsers.length) {
    return 404;
  } else {
    users = [];
    filteredUsers.forEach((x: UserInfo) => users.push(x));
    return 204;
  }
};

export const updateUser = (
  userId: string,
  data: string,
): { code: number; data: Partial<UserInfo> | null } => {
  if (!userId || !validateIdUuid(userId)) return { code: 400, data: null };
  if (users.filter((x: UserInfo) => x.id === userId).length !== 1) return { code: 404, data: null };
  let resturnData: UserInfo | null = null;
  try {
    const newUser = JSON.parse(data);
    let username = '';
    let age = 0;
    let hobbies: string[] = Array();
    Object.keys(newUser).forEach((key: string) => {
      switch (key) {
        case 'username':
          username = newUser['username'];
          break;
        case 'age':
          age = Number(newUser['age']);
          break;
        case 'hobbies': {
          const userHobby = newUser['hobbies'];
          userHobby.forEach((hobby: string) => hobbies.push(hobby));
          break;
        }
        default:
          break;
      }
    });
    const parsedUser = {
      id: userId,
      username,
      age,
      hobbies,
    };
    users
      .filter((x: UserInfo) => x.id === userId)
      .forEach((x: UserInfo) => {
        if (parsedUser.username) x.username = parsedUser.username;
        if (parsedUser.age) x.age = parsedUser.age;
        if (JSON.stringify(parsedUser.hobbies) !== JSON.stringify(x.hobbies))
          x.hobbies = parsedUser.hobbies;
        resturnData = x;
      });
  } catch (error) {
    console.log(error);
  }
  return {
    code: 200,
    data: resturnData,
  };
};
