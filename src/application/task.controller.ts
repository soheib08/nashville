import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from '../domain/command/create-task.command';
import { DeleteTaskCommand } from '../domain/command/delete-task.command';
import { TaskListQuery } from '../domain/query/get-tasks';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { TaskListDto, TaskListRequestDto } from './dto/task-list.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskDto } from './dto/task.dto';

@Controller('tasks')
@ApiTags('tasks')
export class TaskController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'create a single task' })
  @ApiResponse({ type: TaskDto })
  @HttpCode(HttpStatus.CREATED)
  createTask(@Body() body: CreateTaskDto) {
    return this.commandBus.execute(
      new CreateTaskCommand(body.title, body.description, body.parent),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'delete a single task' })
  deleteTask(@Param() param: DeleteTaskDto) {
    return this.commandBus.execute(new DeleteTaskCommand(param.id));
  }

  @Get()
  @ApiOperation({ summary: 'get tasks list' })
  @ApiResponse({ type: TaskListDto })
  @HttpCode(HttpStatus.OK)
  taskList(@Query() query: TaskListRequestDto) {
    return this.queryBus.execute(new TaskListQuery(query.page, query.limit));
  }
}
