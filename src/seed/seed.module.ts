import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CinemangoModule } from 'src/cinemango/cinemango.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [CinemangoModule],
})
export class SeedModule {}
