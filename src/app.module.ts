import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BearerTokenModule } from './bearerToken.module';

@Module({
  imports: [BearerTokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
