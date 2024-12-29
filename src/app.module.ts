import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CinemangoModule } from './cinemango/cinemango.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
    MongooseModule.forRoot(process.env.MONGODB),
    CinemangoModule,
    CommonModule,
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log(`Esta app corre en el puerto ${process.env.PORT}`);
  }
}
