import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {
  @Get('world')
  async helloWorld() {
    return 'Hello World!';
  }
}
