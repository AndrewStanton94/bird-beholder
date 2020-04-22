import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BearerTokenService } from './bearerToken.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, BearerTokenService],
})
export class AppModule {}
