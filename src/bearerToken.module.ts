import { Module } from '@nestjs/common';
import { BearerTokenService } from './bearerToken.service';

@Module({
  imports: [],
  controllers: [],
  providers: [BearerTokenService],
})
export class BearerTokenModule {}
