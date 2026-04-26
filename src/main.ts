import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = Number(configService.get('PORT')) || 4000;
  const nodeEnv = configService.get<string>('NODE_ENV') || 'development';
  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const frontendUrl = configService.get<string>('CAFFENGER_FRONTEND_URL');

  if (!frontendUrl) {
    logger.warn(
      '⚠️ CAFFENGER_FRONTEND_URL is not defined! CORS might block requests.',
    );
  }

  app.enableCors({
    origin: [frontendUrl, 'http://localhost:4200'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(port, '0.0.0.0');

  const separator = '='.repeat(50);
  console.log(`\n${separator}`);
  console.log(`☕ CAFFENGER API - STATUS: ONLINE`);
  console.log(separator);
  console.log(`🌍 Environment :  ${nodeEnv.toUpperCase()}`);
  console.log(`🚀 Port        :  ${port}`);
  console.log(`🔗 API URL     :  http://localhost:${port}`);
  console.log(`🛡️  CORS Origin :  ${frontendUrl || 'NOT SET'}`);
  console.log(`${separator}\n`);

  logger.log(`Application successfully started in ${nodeEnv} mode`);
}
bootstrap();
