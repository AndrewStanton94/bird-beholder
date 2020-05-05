import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  const port = process.env.PORT || 80
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();