import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  GrpcOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder().setTitle('Nashville API').build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  // const grpcOptions: GrpcOptions = {
  //   transport: Transport.GRPC,
  //   options: {
  //     url: 'localhost:50051',
  //     package: 'task',
  //     protoPath: join(__dirname, './', 'task.proto'),
  //   },
  // };

  // app.connectMicroservice<MicroserviceOptions>(grpcOptions);
  // await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
