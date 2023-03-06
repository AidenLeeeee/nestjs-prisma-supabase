import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createUser() {
    // prisma.model.query({})
    const newUser = await this.prisma.user.create({
      data: {
        name: faker.name.firstName(),
        email: faker.datatype.uuid(),
        profile: faker.lorem.sentences(),
        userInfo: {
          create: {
            height: '174',
            weight: 74,
            address: faker.address.city(),
          },
        },
      },
      include: {
        userInfo: true,
      },
    });

    return newUser;
  }
}
