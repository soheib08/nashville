import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TaskListDto } from 'src/application/dto/task-list.dto';
import { TaskListQuery } from 'src/application/query/get-tasks';
import { TaskGrpcService } from '../service/task-grpc.service';

@QueryHandler(TaskListQuery)
export class TaskListHandler implements IQueryHandler<TaskListQuery> {
  constructor(private grpcClient: TaskGrpcService) {}

  async execute(query: TaskListQuery): Promise<TaskListDto> {
    let data = await this.grpcClient.getTaskList(query);
    return new TaskListDto();
  }
}
