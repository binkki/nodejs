import { ServerResponse } from 'http';

export type UserInfo = {
  id?: string;
  username: string;
  age: number;
  hobbies: string[] | [];
};

export type ResponseInfo = {
  res: ServerResponse;
  statusCode: number;
  message: Partial<UserInfo>[] | string;
};

export enum CrudOperations {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}
