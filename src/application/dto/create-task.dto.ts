import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'task 1' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'task description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'uuid example', required: false })
  @IsUUID()
  @IsNotEmpty()
  parent?: string;
}
