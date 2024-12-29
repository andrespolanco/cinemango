import { Module } from '@nestjs/common';
import { CinemangoService } from './cinemango.service';
import { CinemangoController } from './cinemango.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cinemango, CinemangoSchema } from './entities/cinemango.entity';

@Module({
  controllers: [CinemangoController],
  providers: [CinemangoService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Cinemango.name,
        schema: CinemangoSchema
      }
    ])
  ]
})
export class CinemangoModule {}
