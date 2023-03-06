import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(
    body?: Prisma.UserCreateInput,
  ): Promise<User | { count: number }> {
    // const newUser = await this.prisma.user.create({
    //   data: {
    //     name: faker.name.firstName(),
    //     email: faker.datatype.uuid(),
    //     profile: faker.lorem.sentences(),
    //     userInfo: {
    //       create: {
    //         height: '174',
    //         weight: 74,
    //         address: faker.address.city(),
    //       },
    //     },
    //   },
    //   include: {
    //     userInfo: true,
    //   },
    // });

    // const data = new Array(100).fill({}).map((_) => ({
    //   name: faker.name.firstName().slice(0, 9),
    //   email: faker.datatype.uuid(),
    //   profile: faker.lorem.sentences(),
    // }));

    // const newUser: { count: number } = await this.prisma.user.createMany({
    //   data,
    // });

    const newUser: User = await this.prisma.user.create({
      data: {
        name: body.name,
        email: faker.datatype.uuid(),
        profile: body.profile,
      },
    });

    return newUser;
  }
}
