import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from 'src/application/command/create-task.command';
import { TaskGrpcService } from '../service/task-grpc.service';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(private grpcClient: TaskGrpcService) {}

  async execute(command: CreateTaskCommand): Promise<void> {
    let createdTask = this.grpcClient.createTask(command);
  }
}
