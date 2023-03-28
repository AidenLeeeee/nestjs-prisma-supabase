import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MongoService {
    constructor(private readonly prisma: PrismaService) {}
}
