import { Module } from '@nestjs/common';
import { CreateTaskHandler } from './application/handler/create-task.handler';
import { DeleteTaskHandler } from './application/handler/delete-task.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { TaskGrpcService } from './domain/service/task-grpc.service';
import { TaskListHandler } from './application/handler/get-tasks.handler';
import { TaskController } from './application/task.controller';
import { ConfigModule } from '@nestjs/config';
import { validate } from './infrastructure/config/app.configuration';
import { AppGateway } from './app.gateway';

export const QueryHandlers = [TaskListHandler];
export const CommandHandlers = [CreateTaskHandler, DeleteTaskHandler];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    CqrsModule,
  ],
  controllers: [TaskController],
  providers: [
    TaskGrpcService,
    ...QueryHandlers,
    ...CommandHandlers,
    AppGateway,
  ],
})
export class AppModule {}
