import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { TaskDTO } from "../dtos/TaskDTO";
import TaskMapper from "../mappers/TaskMapper";

export class GetTasksInteractor {
    private taskRepository: TaskRepository;

    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }

    public async execute(userId: string): Promise<TaskDTO[]> {
        const tasks = await this.taskRepository.getTasks(userId);
        return tasks.map((task) => TaskMapper.toDTO(task));
    }
}
