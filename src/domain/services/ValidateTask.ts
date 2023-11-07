import { TaskDTO } from "../../application/dtos/TaskDTO";

export class TaskValidationService {
    public validateTask(task: TaskDTO): boolean {
        // Simulation de validations supplémentaires avant d'ajouter la tâche
        if (task.title.length < 5) {
            return false;
        }

        return true;
    }
}
