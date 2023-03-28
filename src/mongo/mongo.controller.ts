import { Body, Controller, Get, Post } from '@nestjs/common';
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
        const payload = new PostEntity.Builder().title(body.title).build();
        return payload;

        // return this.mongoService.createPost(payload);
    }
}
