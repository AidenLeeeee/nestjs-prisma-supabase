import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MongoService {
    constructor(private readonly prisma: PrismaService) {}

    async getUsers() {
        return await this.prisma.user.findMany({});
    }

    async createUser() {
        const newUser = await this.prisma.user.create({
            data: {
                age: 0,
                height: 10.0,
                role: 'USER',
            },
        });
    }
}
