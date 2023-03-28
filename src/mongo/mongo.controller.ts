import { Controller } from '@nestjs/common';
import { MongoService } from './mongo.service';

@Controller()
export class MongoController {
    constructor(private readonly appService: MongoService) {}
}
