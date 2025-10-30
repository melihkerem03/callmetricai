import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: [/\.callmetricai\.com$/, 'http://localhost:3000'] } });

  const config = new DocumentBuilder()
    .setTitle('CallMetricAI API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, doc);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();