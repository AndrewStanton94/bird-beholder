import { Injectable } from '@nestjs/common';
import { BearerTokenService } from './bearerToken.service';

import fetch from 'node-fetch';

@Injectable()
export class TwitterSearchService {
  constructor(private bearerTokenService: BearerTokenService) {}
  getHello(): string {
    console.log(this.bearerTokenService.bearerToken);
    return 'Hello Searchers!';
  }

  search(): Promise<JSON> {
    const user = 'CarlBovisNature';
    const url = `https://api.twitter.com/1.1/search/tweets.json?q=from%3A${user}&result_type=mixed&count=2`;
    return fetch(url, {
      headers: {
        Authorization: 'Bearer ' + this.bearerTokenService.bearerToken,
      },
    }).then(res => res.json()); // expecting a json response
  }
}
