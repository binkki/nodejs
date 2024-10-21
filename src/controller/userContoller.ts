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

export const addUser = (data: string): Partial<UserInfo> => {
    let result : Partial<UserInfo> = { id: "" };
    let isValidUser = true;
    try {
        const newUser = JSON.parse(data);
        let username = '';
        let age = -1;
        let hobbies: string[] = Array();
        Object.keys(newUser).forEach((key: string) => {
            switch (key) {
                case "username":
                    username = newUser["username"];
                    break;
                case "age":
                    age = Number(newUser["age"]);
                    break;
                case "hobbies": {
                    const userHobby = newUser["hobbies"];
                    userHobby.forEach((hobby: string) => hobbies.push(hobby));
                    break;
                }
                default:
                    isValidUser = false;
            }
        });
        const parsedUser = {
            id: String(users.length + 1),
            username,
            age,
            hobbies
        };
        if (isValidUser && username !== '' && !Number.isNaN(age)) {
            users.push(parsedUser);
            result = users[users.length - 1];
        }
    } catch (error) {};
    return result;
}
