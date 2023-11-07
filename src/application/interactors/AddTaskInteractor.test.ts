import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { TaskValidationService } from "../../domain/services/ValidateTask";
import { TaskDTO } from "../dtos/TaskDTO";
import TaskMapper from "../mappers/TaskMapper";
import { AddTaskInteractor } from "./AddTaskInteractor";

const mockTaskRepository: TaskRepository = {
    createTask: jest.fn(),
    getTasks: jest.fn().mockResolvedValue([
        {
            id: "123456789",
            title: "Example Task",
            description: "This is an example task",
            dueDate: new Date(),
            completed: false,
            userId: "123456789",
            priority: "high",
        },
    ]),
};

const mockTaskValidationService: TaskValidationService = {
    validateTask: jest.fn().mockReturnValue(true),
};

const addTaskInteractor = new AddTaskInteractor(mockTaskRepository, mockTaskValidationService);

test("AddTaskInteractor executes successfully with valid task", () => {
    // Arrange
    const newTask: TaskDTO = {
        title: "Example Task",
        description: "This is an example task",
        dueDate: new Date(),
        completed: false,
        userId: "123456789",
        priority: "high",
    };

    // Act
    const result = addTaskInteractor.execute(newTask);

    // Assert
    expect(result).toBe(true); // Ensure that the result is true since the task is valid
    expect(mockTaskValidationService.validateTask).toHaveBeenCalledWith(newTask);
    expect(mockTaskRepository.createTask).toHaveBeenCalledWith(TaskMapper.toEntity(newTask));
});

// Test case: Invalid task should not be added
test("AddTaskInteractor returns false with invalid task", () => {
    // Arrange
    const invalidTask: TaskDTO = {
        title: "toc",
        description: "This is an example task",
        dueDate: new Date(),
        completed: false,
        userId: "123456789",
        priority: "high",
    };

    // Act
    const result = addTaskInteractor.execute(invalidTask);

    expect(result).toBe(false); // Ensure that the result is false since the task is invalid
    expect(mockTaskValidationService.validateTask).toHaveBeenCalledWith(invalidTask);
    expect(mockTaskRepository.createTask).not.toHaveBeenCalled(); // Ensure that createTask is not called with an invalid task
});
