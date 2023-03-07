import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  Post as PostModel,
  Prisma,
  User as UserModel,
  UserInfo as UserInfoModel,
} from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getUserWithPost(): Promise<UserModel> {
    return await this.appService.getUserWithPost();
  }

  @Post('user')
  async createUser(
    @Body() body?: Prisma.UserCreateInput,
  ): Promise<UserModel | { count: number }> {
    return await this.appService.createUser(body);
  }

  @Post('post')
  async createPost(
    @Body() body: Prisma.PostUncheckedCreateInput,
  ): Promise<PostModel> {
    return await this.appService.createPost(body);
  }

  @Delete('user')
  async deleteUser(
    @Query('userId', ParseIntPipe) userId: number,
  ): Promise<{ count: number }> {
    return await this.appService.deleteUser(userId);
  }

  @Patch('user')
  async patchUser(
    @Body() body: Prisma.UserInfoUncheckedUpdateInput,
  ): Promise<UserInfoModel | { count: number }> {
    return await this.appService.patchUser(body);
  }
}
