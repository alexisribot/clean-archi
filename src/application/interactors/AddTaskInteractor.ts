import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { TaskValidationService } from "../../domain/services/ValidateTask";
import { TaskDTO } from "../dtos/TaskDTO";
import TaskMapper from "../mappers/TaskMapper";

export class AddTaskInteractor {
    private taskRepository: TaskRepository;
    private taskValidationService: TaskValidationService;

    constructor(taskRepository: TaskRepository, taskValidationService: TaskValidationService) {
        this.taskRepository = taskRepository;
        this.taskValidationService = taskValidationService;
    }

    public execute(newTask: TaskDTO): boolean {
        const isValid = this.taskValidationService.validateTask(newTask);

        if (!isValid) {
            return false;
        }

        this.taskRepository.createTask(TaskMapper.toEntity(newTask));

        return true;
    }
}
