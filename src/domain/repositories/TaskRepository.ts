import { Task } from "../entities/Task";

export interface TaskRepository {
    createTask(task: Task): Promise<void>;
    getTasks(userId: string): Promise<Task[]>;
}
