import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BearerTokenModule } from './bearerToken.module';
import { TwitterSearchModule } from './twitterSearch.module'

@Module({
  imports: [BearerTokenModule, TwitterSearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
