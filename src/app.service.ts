import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import {
  Post as PostModel,
  Prisma,
  User as UserModel,
  UserInfo as UserInfoModel,
} from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserWithPost(): Promise<UserModel> {
    return await this.prisma.user.findUnique({
      where: {
        userId: 107,
      },
      include: {
        posts: true,
      },
    });
  }

  async createUser(
    body?: Prisma.UserCreateInput,
  ): Promise<UserModel | { count: number }> {
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

    // const newUser: UserModel = await this.prisma.user.create({
    //   data: {
    //     name: body.name,
    //     email: faker.datatype.uuid(),
    //     profile: body.profile,
    //     posts: {
    //       connect: [{ postId: 6 }, { postId: 7 }, { postId: 8 }],
    //     },
    //   },
    // });

    return newUser;
  }

  async patchUser(
    body: Prisma.UserInfoUncheckedUpdateInput,
  ): Promise<UserInfoModel | { count: number }> {
    // const newInfo: UserInfoModel = await this.prisma.userInfo.upsert({
    //   where: {
    //     userId: Number(body.userId),
    //   },
    //   update: {
    //     height: body.height,
    //   },
    //   create: {
    //     userId: Number(body.userId),
    //     height: String(body.height),
    //     weight: Math.round(Math.random() * 100) + 100,
    //     address: faker.address.city(),
    //   },
    // });

    const newInfo = await this.prisma.userInfo.update({
      where: {
        userId: Number(body.userId),
      },
      data: {
        weight: Number(body.weight),
      },
    });

    // const newInfo = await this.prisma.userInfo.updateMany({
    //   where: {
    //     userId: {
    //       in: [102, 104, 106, 107],
    //     },
    //   },
    //   data: {
    //     address: faker.address.buildingNumber(),
    //   },
    // });

    return newInfo;
  }

  async deleteUser(userId: number): Promise<{ count: number }> {
    const old: { count: number } = await this.prisma.user.deleteMany({
      where: {
        userId: userId,
      },
    });

    return old;
  }

  async getPostsWithPagination(page: number, take: number) {
    const [count, posts] = await Promise.all([
      this.prisma.post.count(),
      this.prisma.post.findMany({
        take, // 몇개를 읽어오는지
        skip: take * (page - 1), // 몇개를 건너뛸건지
        orderBy: {
          postId: 'desc',
        },
      }),
    ]);

    return {
      currentPage: page,
      totalPage: Math.ceil(count / take),
      posts,
    };
  }

  async createPost(body?: Prisma.PostUncheckedCreateInput): Promise<PostModel> {
    const newPost: PostModel = await this.prisma.post.create({
      data: {
        content: (body && body.content) || faker.lorem.paragraph(),
        writerId: Math.round(Math.random() * 100),
      },
      include: {
        writer: true,
      },
    });

    return newPost;
  }

  async createFakeUsers(numOfUsers: number): Promise<{ count: number }> {
    const data = new Array(numOfUsers).fill({}).map((_) => ({
      name: faker.name.firstName().slice(0, 9),
      email: faker.datatype.uuid(),
      profile: faker.lorem.sentences(),
    }));

    const newUsers: { count: number } = await this.prisma.user.createMany({
      data,
    });

    return newUsers;
  }

  async createFakeUserInfo(userId: number): Promise<UserInfoModel> {
    const newInfo: UserInfoModel = await this.prisma.userInfo.upsert({
      where: {
        userId,
      },
      update: {
        height: String(Math.round(Math.random() * 100) + 100),
        weight: Math.round(Math.random() * 100) + 30,
        address: faker.address.city(),
      },
      create: {
        userId,
        height: String(Math.round(Math.random() * 100) + 100),
        weight: Math.round(Math.random() * 100) + 30,
        address: faker.address.city(),
      },
    });

    return newInfo;
  }
}
