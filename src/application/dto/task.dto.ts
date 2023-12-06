import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty({ example: 'uuid' })
  readonly id: string;

  @ApiProperty({ example: 'uuid' })
  readonly parentId: string;

  @ApiProperty({ example: 'task 1' })
  readonly title: string;

  @ApiProperty({ example: 'task 1 description' })
  readonly description: string;

  @ApiProperty({ example: new Date() })
  readonly createdAt: Date;

  @ApiProperty({ example: new Date() })
  readonly updatedAt: Date;
}
