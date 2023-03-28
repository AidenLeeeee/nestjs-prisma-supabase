import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MongoController } from './mongo.controller';
import { MongoService } from './mongo.service';

@Module({
    imports: [PrismaModule],
    controllers: [MongoController],
    providers: [MongoService],
})
export class MongoModule {}
