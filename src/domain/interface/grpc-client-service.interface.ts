import { Observable } from 'rxjs';
import { TaskListDto } from 'src/application/dto/task-list.dto';
import { TaskDto } from 'src/application/dto/task.dto';

export interface CreateTaskRequest {
  title: string;
  description: string;
  parent?: string;
}
export interface DeleteTaskRequest {
  id: string;
}
export interface TaskListRequest {
  page: number;
  limit: number;
}
export interface Task {
  id: string;
  title: string;
  description: string;
  parent: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TasksService {
  createTask(data: CreateTaskRequest): Observable<TaskDto>;
  deleteTask(data: DeleteTaskRequest): Observable<void>;
  taskList(data: TaskListRequest): Observable<TaskListDto>;
}
