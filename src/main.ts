import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  GrpcOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // gRPC microservice options
  const grpcOptions: GrpcOptions = {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:50051',
      package: 'task',
      protoPath: join(__dirname, './', 'task.proto'),
    },
  };

  app.connectMicroservice<MicroserviceOptions>(grpcOptions);
  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
