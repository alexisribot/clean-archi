import { Timestamp } from "firebase/firestore";
import { Task } from "../../domain/entities/Task";
import { TaskDTO } from "../dtos/TaskDTO";

class TaskMapper {
    static toEntity(taskDTO: TaskDTO): Task {
        const dueDate = Timestamp.fromDate(taskDTO.dueDate); // Conversion du Timestamp en Date JavaScript
        return {
            title: taskDTO.title,
            description: taskDTO.description,
            dueDate,
            completed: taskDTO.completed,
            userId: taskDTO.userId,
            priority: taskDTO.priority,
        };
    }

    static toDTO(task: Task): TaskDTO {
        const dueDate = task.dueDate.toDate(); // Conversion de la Date JavaScript en Timestamp
        return {
            title: task.title,
            description: task.description,
            dueDate,
            completed: task.completed,
            userId: task.userId,
            priority: task.priority,
        };
    }
}

export default TaskMapper;
