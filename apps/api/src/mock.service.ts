import { Injectable } from '@nestjs/common';

export type StaticUser = { id: string; email: string; name?: string };
export type StaticMessage = { id: string; email: string; message: string; createdAt: string };

const staticUsers: StaticUser[] = [
  { id: 'u_1', email: 'alice@example.com', name: 'Alice' },
  { id: 'u_2', email: 'bob@example.com', name: 'Bob' },
];

const staticMessages: StaticMessage[] = [
  { id: 'm_1', email: 'alice@example.com', message: 'Hello!', createdAt: new Date().toISOString() },
  { id: 'm_2', email: 'bob@example.com', message: 'Need help', createdAt: new Date().toISOString() },
];

@Injectable()
export class MockService {
  users() {
    return staticUsers;
  }

  messages() {
    return staticMessages;
  }

  messageById(id: string) {
    return staticMessages.find((m) => m.id === id) ?? null;
  }
}
