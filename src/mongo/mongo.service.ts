import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostEntity } from '../entities/post.entity';

@Injectable()
export class MongoService {
    constructor(private readonly prisma: PrismaService) {}

    async getUsers() {
        return await this.prisma.user.findMany({
            select: {
                userId: true,
                posts: {
                    select: {
                        title: true,
                        comments: {
                            select: {
                                content: true,
                                createdAt: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async createUser(payload?) {
        const newUser = await this.prisma.user.create({
            data: {
                age: 0,
                height: 10.0,
                role: 'USER',
            },
        });

        return newUser;
    }

    async createPost(payload: PostEntity) {
        const newPost = await this.prisma.post.create({
            data: {
                title: payload.title,
                writerId: payload.writerId,
                comments: payload.comments,
            },
        });

        return newPost;
    }

    async getResult(query) {
        const data = await this.prisma.search.findMany({
            where: {
                keywords: {
                    has: query,
                },
            },
        });

        const result = await this.prisma.search.findMany({
            where: {
                OR: [
                    {
                        keyword: {
                            in: data.map((e) => e.keyword),
                        },
                    },
                    {
                        keywords: {
                            hasSome: data.map((e) => e.keyword),
                        },
                    },
                ],
            },
        });

        return result.map((e) => ({ keyword: e.keyword }));
    }

    async createKeyword(keyword) {
        const exKeyword = await this.prisma.search.findUnique({
            where: {
                keyword,
            },
        });

        if (!exKeyword) {
            return this.prisma.search.create({
                data: {
                    keyword,
                },
            });
        }

        return exKeyword;
    }

    async addAndSearch(keyword, before) {
        return this.prisma.$transaction(async (ctx) => {
            return ctx.search.update({
                where: {
                    keyword,
                },
                data: {
                    keywords: {
                        push: before,
                    },
                },
            });
        });
    }
}
