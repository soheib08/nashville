import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder().setTitle('Nashville API').build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
