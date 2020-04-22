import { Controller, Get } from '@nestjs/common';
import { TwitterSearchService } from './twitterSearch.service';

@Controller('search')
export class TwitterSearchController {
  constructor(
    private readonly twitterSearchService: TwitterSearchService,
  ) {}

  @Get()
  getHello(): string {
    return this.twitterSearchService.getHello();
  }
}
