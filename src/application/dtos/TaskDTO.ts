import { Priority } from "../../domain/entities/Task";

export interface TaskDTO {
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    userId: string;
    priority: Priority;
}
