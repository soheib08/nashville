import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TaskListQuery } from 'src/domain/query/get-tasks';
import { TaskGrpcService } from '../../domain/service/task-grpc.service';

@QueryHandler(TaskListQuery)
export class TaskListHandler implements IQueryHandler<TaskListQuery> {
  constructor(private grpcClient: TaskGrpcService) {}

  async execute(query: TaskListQuery) {
    let res = await this.grpcClient.getTaskList(query);
    return res;
  }
}
