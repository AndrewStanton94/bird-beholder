import { Injectable } from '@nestjs/common';
import { BearerTokenService } from './bearerToken.service';

@Injectable()
export class TwitterSearchService {
  constructor(private bearerTokenService: BearerTokenService) {}
  getHello(): string {
    console.log(this.bearerTokenService.bearerToken);
    return 'Hello Searchers!';
  }
}
