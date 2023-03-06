import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('user')
  createUser(
    @Body() body?: Prisma.UserCreateInput,
  ): Promise<User | { count: number }> {
    return this.appService.createUser(body);
  }
}
