import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTaskCommand } from 'src/application/command/delete-task.command';
import { TaskGrpcService } from '../service/task-grpc.service';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(private grpcClient: TaskGrpcService) {}

  async execute(command: DeleteTaskCommand): Promise<void> {
    let deletedTask = this.grpcClient.deleteTask(command);
  }
}
