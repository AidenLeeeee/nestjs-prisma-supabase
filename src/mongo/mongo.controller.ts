import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { PostEntity } from 'src/entities/post.entity';
import { UserEntity } from 'src/entities/user.entity';
import { MongoService } from './mongo.service';

@Controller()
export class MongoController {
    constructor(private readonly mongoService: MongoService) {}

    @Get('user')
    getUsers() {
        return this.mongoService.getUsers();
    }

    @Post('user')
    createUser(@Body() body) {
        const payload = new UserEntity.Builder()
            .age(body.age)
            .height(body.height)
            .build();
        return payload;
        // return this.mongoService.createUser(payload);
    }

    @Post('post')
    createPost(@Body() body) {
        const payload = new PostEntity.Builder()
            .title(body.title)
            .writerId(body.writerId)
            .comments(body.comments)
            .build();

        return this.mongoService.createPost(payload);
    }

    @Get('search')
    getResult(@Query('keyword') keyword) {
        return this.mongoService.getResult(keyword);
    }

    @Post('search')
    createKeyword(@Body('keyword') keyword) {
        return this.mongoService.createKeyword(keyword);
    }

    @Patch('search')
    addAndSearch(@Body('keyword') keyword, @Query('before') before) {
        return this.mongoService.addAndSearch(keyword, before);
    }
}
