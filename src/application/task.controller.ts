import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from './command/create-task.command';
import { DeleteTaskCommand } from './command/delete-task.command';
import { TaskListQuery } from './query/get-tasks';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { TaskListDto, TaskListRequestDto } from './dto/task-list.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TaskDto } from './dto/task.dto';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'create a single task' })
  @ApiResponse({ type: TaskDto })
  @HttpCode(HttpStatus.CREATED)
  createTask(@Body() data: CreateTaskDto) {
    this.commandBus.execute(
      new CreateTaskCommand(data.parent, data.title, data.description),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'delete a single task' })
  deleteTask(data: DeleteTaskDto) {
    this.commandBus.execute(new DeleteTaskCommand(data.id));
  }

  @Get()
  @ApiOperation({ summary: 'get tasks list' })
  @ApiResponse({ type: TaskListDto })
  @HttpCode(HttpStatus.OK)
  taskList(@Query() query: TaskListRequestDto) {
    this.queryBus.execute(new TaskListQuery(query.page, query.limit));
  }
}
