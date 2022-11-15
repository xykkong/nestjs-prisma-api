import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './providers';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    getFastifyAdapter(),
  );
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT');
  const stage = configService.get<string>('NODE_ENV');

  const document = SwaggerModule.createDocument(app, getSwaggerConfig());
  SwaggerModule.setup('api', app, document);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(port, '0.0.0.0');
  console.log(
    `Application is running in stage ${stage} on: ${await app.getUrl()}`,
  );
}

function getFastifyAdapter() {
  const CORS_OPTIONS = {
    origin: '*',
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Origin',
      'X-Requested-With',
      'Accept',
      'Content-Type',
      'Authorization',
    ],
    exposedHeaders: 'Authorization',
    credentials: true,
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  };

  const adapter = new FastifyAdapter();
  adapter.enableCors(CORS_OPTIONS);
  return adapter;
}

function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('API example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('API')
    .build();
}

bootstrap();
