import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CreateTaskDto } from './application/dto/create-task.dto';
import { DeleteTaskDto } from './application/dto/delete-task.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from './domain/command/create-task.command';
import { DeleteTaskCommand } from './domain/command/delete-task.command';
import {
  TaskListDto,
  TaskListRequestDto,
} from './application/dto/task-list.dto';
import { TaskListQuery } from './domain/query/get-tasks';

@WebSocketGateway({
  cors: { origin: true, credentials: true },
  allowEIO3: true,
})
export class AppGateway implements OnGatewayDisconnect, OnGatewayConnection {
  private readonly logger = new Logger(AppGateway.name);
  constructor(private commandBus: CommandBus) {}

  @WebSocketServer()
  server: Server;

  handleDisconnect(client: Socket) {
    this.logger.verbose(`Client Disconnected : ${client.id}`);
  }

  async handleConnection(client: Socket) {
    this.logger.verbose(`Client Connected : ${client.id}`);
    try {
    } catch (err) {
      this.logger.error(`error with validate user token`);
      client.disconnect();
    }
  }

  @SubscribeMessage('create_task')
  async createTask(
    @MessageBody() data: CreateTaskDto,
    @ConnectedSocket() socket: Socket,
  ) {
    return this.commandBus.execute(
      new CreateTaskCommand(data.title, data.description, data.parent),
    );
  }

  @SubscribeMessage('delete_task')
  async deleteTask(
    @MessageBody() data: DeleteTaskDto,
    @ConnectedSocket() socket: Socket,
  ) {
    return this.commandBus.execute(new DeleteTaskCommand(data.id));
  }

  @SubscribeMessage('task_list')
  async taskList(@MessageBody() data: TaskListRequestDto) {
    return this.commandBus.execute(new TaskListQuery(data.page, data.limit));
  }
}
