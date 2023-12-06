import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTaskCommand } from 'src/domain/command/delete-task.command';
import { TaskGrpcService } from '../../domain/service/task-grpc.service';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(private grpcClient: TaskGrpcService) {}

  async execute(command: DeleteTaskCommand): Promise<void> {
    let res = await this.grpcClient.deleteTask(command);
  }
}
