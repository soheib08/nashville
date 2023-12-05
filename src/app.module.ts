import { Module } from '@nestjs/common';
import { CreateTaskHandler } from './domain/handler/create-task.handler';
import { DeleteTaskHandler } from './domain/handler/delete-task.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { TaskGrpcService } from './domain/service/task-grpc.service';
import { TaskListHandler } from './domain/handler/get-tasks.handler';

export const QueryHandlers = [TaskListHandler];
export const CommandHandlers = [CreateTaskHandler, DeleteTaskHandler];

@Module({
  imports: [CqrsModule],
  controllers: [],
  providers: [TaskGrpcService, ...QueryHandlers, ...CommandHandlers],
})
export class AppModule {}
