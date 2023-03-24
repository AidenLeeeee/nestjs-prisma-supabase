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

    @Get('user')
    async getUserWithPost(@Query('userId', ParseIntPipe) userId: number) {
        return await this.appService.getUserWithPost(userId);
    }

    @Get('users')
    async getUser() {
        return this.appService.getUser();
    }

    @Post('user')
    async createUser(
        @Body() body?: Prisma.UserCreateInput,
    ): Promise<UserModel | { count: number }> {
        return await this.appService.createUser(body);
    }

    @Patch('user')
    async patchUser(
        @Body() body: Prisma.UserInfoUncheckedUpdateInput,
    ): Promise<UserInfoModel | { count: number }> {
        return await this.appService.patchUser(body);
    }

    @Delete('user')
    async deleteUser(
        @Query('userId', ParseIntPipe) userId: number,
    ): Promise<{ count: number }> {
        return await this.appService.deleteUser(userId);
    }

    @Get('post')
    async etPostsWithPagination(
        @Query('page', ParseIntPipe) page: number,
        @Query('take', ParseIntPipe) take: number,
    ) {
        return await this.appService.getPostsWithPagination(page, take);
    }

    @Post('post')
    async createPost() {
        return await this.appService.createPost();
    }

    @Post('fakeUsers')
    async createFakeUsers(
        @Body('numOfUsers') numOfUsers: number,
    ): Promise<{ count: number }> {
        return await this.appService.createFakeUsers(numOfUsers);
    }

    @Post('fakeUserInfo')
    async createFakeUserInfo(
        @Body('userId') userId: number,
    ): Promise<UserInfoModel> {
        return await this.appService.createFakeUserInfo(userId);
    }
}
