import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CreateTaskCommand } from 'src/domain/command/create-task.command';
import { DeleteTaskCommand } from 'src/domain/command/delete-task.command';
import { TaskListDto } from 'src/application/dto/task-list.dto';
import { TaskListQuery } from 'src/domain/query/get-tasks';
import { TasksService } from 'src/domain/interface/grpc-client-service.interface';

@Injectable()
export class TaskGrpcService implements OnModuleInit {
  constructor() {}
  @Client({
    transport: Transport.GRPC,
    options: {
      url: process.env.GRPC_URL,
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
    return new Promise((resolve, rejects) => {
      try {
        let createdTaskObservable = this.tasksService.createTask(data);
        createdTaskObservable.subscribe((result) => {
          resolve(result);
        });
      } catch (err) {
        rejects(err);
      }
    });
  }

  deleteTask(data: DeleteTaskCommand) {
    return new Promise((resolve, rejects) => {
      try {
        let deletedTaskObservable = this.tasksService.deleteTask(data);
        deletedTaskObservable.subscribe((result) => {
          resolve(result);
        });
      } catch (err) {
        rejects(err);
      }
    });
  }

  getTaskList(data: TaskListQuery) {
    return new Promise((resolve, rejects) => {
      try {
        let deletedTaskObservable = this.tasksService.taskList(data);
        deletedTaskObservable.subscribe((result) => {
          let res = new TaskListDto();
          res = result;
          resolve(res);
        });
      } catch (err) {
        rejects(err);
      }
    });
  }
}
