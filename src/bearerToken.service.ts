import {
  Injectable,
  OnApplicationBootstrap,
  BeforeApplicationShutdown,
} from '@nestjs/common';

@Injectable()
export class BearerTokenService
  implements OnApplicationBootstrap, BeforeApplicationShutdown {
  onApplicationBootstrap(): string {
    console.log('This works');
    return 'Hello World!';
  }

  beforeApplicationShutdown(signal: string = ''): string {
    console.log('The end?', signal);
    return 'Byeeee';
  }
}
