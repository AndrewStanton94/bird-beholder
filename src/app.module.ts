import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BearerTokenModule } from './bearerToken.module';
import { TwitterSearchModule } from './twitterSearch.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'bird-beholder'),
    }),
    BearerTokenModule,
    TwitterSearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
