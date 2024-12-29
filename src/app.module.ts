import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CinemangoModule } from './cinemango/cinemango.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
    MongooseModule.forRoot('mongodb://localhost:27017/cinemango'),
    CinemangoModule,
    CommonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
