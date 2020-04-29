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

  searchUser(
    user: string = 'CarlBovisNature',
    filters: string = '[]',
    count: number = 2,
  ): Promise<JSON> {
    const filterString = encodeURIComponent(JSON.parse(filters).join(' '));
    const q = `from%3A${user}%20${filterString}`;
    const queryString = `q=${q}&result_type=mixed&count=${count}`;
    const url = `https://api.twitter.com/1.1/search/tweets.json?${queryString}`;

    return fetch(url, {
      headers: {
        Authorization: 'Bearer ' + this.bearerTokenService.bearerToken,
      },
    }).then(res => res.json()); // expecting a json response
  }
}
