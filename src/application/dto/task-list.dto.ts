import { ApiProperty } from '@nestjs/swagger';
import { TaskDto } from './task.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class TaskListRequestDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsNotEmpty()
  limit: number;
}

export class TaskListDto {
  @ApiProperty({ type: TaskDto, isArray: true })
  items: Array<TaskDto>;

  @ApiProperty({ example: 10 })
  total: number;
}
