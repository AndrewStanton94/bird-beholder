import {
  Injectable,
  OnApplicationBootstrap,
  BeforeApplicationShutdown,
} from '@nestjs/common';

import fetch from 'node-fetch';

@Injectable()
export class BearerTokenService
  implements OnApplicationBootstrap, BeforeApplicationShutdown {
  private _bearerToken: string;

  public get bearerToken(): string {
    return this._bearerToken;
  }

  onApplicationBootstrap(): string {
    console.log('This works');
    this._bearerToken = 'A value';
    const credentials = `${process.env.API_KEY}:${process.env.API_SECRET}`;
    const encodedCredentials = Buffer.from(credentials, 'utf8').toString(
      'base64',
    );

    fetch('https://api.twitter.com/oauth2/token', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + encodedCredentials,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: 'grant_type=client_credentials',
    })
      .then(res => res.json()) // expecting a json response
      .then(json => {
        console.log(json);
        if (json.token_type === 'bearer') {
          this._bearerToken = json.access_token;
          console.log('Bearer token received');
        }
      });
    return 'Hello World!';
  }

  beforeApplicationShutdown(signal: string = ''): string {
    console.log('The end?', signal);
    return 'Byeeee';
  }
}
