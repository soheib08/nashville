import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteTaskDto {
  @ApiProperty({ example: 'uuid example' })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
