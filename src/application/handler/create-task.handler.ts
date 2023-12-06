import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from 'src/domain/command/create-task.command';
import { TaskGrpcService } from '../../domain/service/task-grpc.service';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(private grpcClient: TaskGrpcService) {}

  async execute(command: CreateTaskCommand) {
    return await this.grpcClient.createTask(command);
  }
}
