import {
  Injectable,
  OnApplicationBootstrap,
  BeforeApplicationShutdown,
} from '@nestjs/common';

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
    return 'Hello World!';
  }

  beforeApplicationShutdown(signal: string = ''): string {
    console.log('The end?', signal);
    return 'Byeeee';
  }
}
