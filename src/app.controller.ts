import { Body, Controller, Get, Post } from '@nestjs/common';
import { Post as PostModel, Prisma, User as UserModel } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUserWithPost(): Promise<UserModel> {
    return this.appService.getUserWithPost();
  }

  @Post('user')
  createUser(
    @Body() body?: Prisma.UserCreateInput,
  ): Promise<UserModel | { count: number }> {
    return this.appService.createUser(body);
  }

  @Post('post')
  createPost(
    @Body() body: Prisma.PostUncheckedCreateInput,
  ): Promise<PostModel> {
    return this.appService.createPost(body);
  }
}
