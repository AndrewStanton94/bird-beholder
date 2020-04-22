import { Module } from '@nestjs/common';
import { BearerTokenModule } from './bearerToken.module';
import {TwitterSearchController} from './twitterSearch.controller'
import { TwitterSearchService } from './twitterSearch.service';

@Module({
  imports: [BearerTokenModule],
  controllers: [TwitterSearchController],
  providers: [TwitterSearchService],
})
export class TwitterSearchModule {}
