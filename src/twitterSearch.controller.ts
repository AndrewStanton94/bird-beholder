import { Controller, Get, Param } from '@nestjs/common';
import { TwitterSearchService } from './twitterSearch.service';

@Controller('search')
export class TwitterSearchController {
  constructor(private readonly twitterSearchService: TwitterSearchService) {}

  @Get('user/:user?/:filters?/:count?')
  getUserPosts(@Param() params): Promise<JSON> {
    console.log(params);
    const filterString = params.filters;
    const filters = filterString ? decodeURIComponent(filterString) : undefined;

    return this.twitterSearchService.searchUser(params.user, filters, params.count);
  }
}
