import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [{ emit: 'stdout', level: 'query' }],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    await this.$connect();

    // Middleware
    this.$use(async (params, next) => {
      console.log(params);

      const res = await next(params);
      return res;
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
