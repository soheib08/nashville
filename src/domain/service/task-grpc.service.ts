import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Observable } from 'rxjs';
import { CreateTaskCommand } from 'src/application/command/create-task.command';
import { DeleteTaskCommand } from 'src/application/command/delete-task.command';
import { TaskListQuery } from 'src/application/query/get-tasks';

interface TasksService {
  createTask(data: CreateTaskCommand): Observable<any>;
  deleteTask(data: DeleteTaskCommand): Observable<any>;
  findOne(data: { id: number }): Observable<any>;
  taskList(data: TaskListQuery): Observable<any>;
}

@Injectable()
export class TaskGrpcService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:50051',
      package: 'task',
      protoPath: join(__dirname, '../../', 'task.proto'),
    },
  })
  client: ClientGrpc;

  private tasksService: TasksService;

  onModuleInit() {
    this.tasksService = this.client.getService<TasksService>('TasksService');
  }

  createTask(data: CreateTaskCommand) {
    return this.tasksService.createTask(data);
  }

  deleteTask(data: DeleteTaskCommand) {
    return this.tasksService.deleteTask(data);
  }

  getTaskList(data: TaskListQuery): Observable<string> {
    return this.tasksService.taskList(data);
  }
}
