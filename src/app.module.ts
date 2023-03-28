import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import * as Joi from 'joi';
import { MongoModule } from './mongo/mongo.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                SUPABASE_URL: Joi.string().required(),
                DATABASE_URL_MONGO: Joi.string().required(),
            }),
        }),
        PrismaModule,
        MongoModule,
    ],
})
export class AppModule {}
