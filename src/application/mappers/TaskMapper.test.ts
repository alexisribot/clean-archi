import { Timestamp } from "firebase/firestore";
import { Task } from "../../domain/entities/Task";
import { TaskDTO } from "../dtos/TaskDTO";
import TaskMapper from "./TaskMapper";

describe("TaskMapper", () => {
    const taskDTO: TaskDTO = {
        title: "Task 1",
        description: "Description of Task 1",
        dueDate: new Date(),
        completed: false,
        userId: "user1",
    };

    const task: Task = {
        title: "Task 1",
        description: "Description of Task 1",
        dueDate: Timestamp.now(),
        completed: false,
        userId: "user1",
    };

    it("should correctly map TaskDTO to Task entity", () => {
        const result = TaskMapper.toEntity(taskDTO);
        expect(result).toEqual(task);
    });

    it("should correctly map Task entity to TaskDTO", () => {
        const result = TaskMapper.toDTO(task);
        expect(result).toEqual(taskDTO);
    });
});
