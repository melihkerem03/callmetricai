import { Controller, Get, Param } from '@nestjs/common';
import { MockService } from './mock.service';

@Controller('mock')
export class MockController {
  constructor(private readonly mockService: MockService) {}

  @Get('users')
  users() {
    return this.mockService.users();
  }

  @Get('messages')
  messages() {
    return this.mockService.messages();
  }

  @Get('messages/:id')
  message(@Param('id') id: string) {
    return this.mockService.messageById(id);
  }
}
