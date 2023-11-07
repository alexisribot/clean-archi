import { collection, DocumentData, Firestore, QuerySnapshot } from "firebase/firestore";
import { TaskDTO } from "../../../application/dtos/TaskDTO";
import TaskMapper from "../../../application/mappers/TaskMapper";
import { TaskRepository } from "../../../domain/repositories/TaskRepository";
import FirebaseTaskRepository from "./TaskRepository";

describe("FirebaseTaskRepository", () => {
    let firestore: Firestore;
    let taskRepository: TaskRepository;

    beforeEach(() => {
        // Mock the Firestore instance and initialize the repository
        firestore = {
            // Mock Firestore methods as needed for testing
            // ...
        } as Firestore;
        taskRepository = new FirebaseTaskRepository(firestore);
    });

    describe("createTask", () => {
        it("should create a task in Firestore", async () => {
            // Arrange
            const taskDTO: TaskDTO = {
                title: "Task 1",
                description: "Description of Task 1",
                dueDate: new Date(),
                completed: false,
                userId: "user1",
            };

            // Mock Firestore addDoc method
            const mockAddDoc = jest.spyOn(firestore, "addDoc").mockResolvedValueOnce();

            // Act
            await taskRepository.createTask(taskDTO);

            // Assert
            expect(mockAddDoc).toHaveBeenCalledWith(
                collection(firestore, "users", taskDTO.userId, "tasks"),
                TaskMapper.toEntity(taskDTO)
            );
        });

        it("should throw an error if creating a task fails", async () => {
            // Arrange
            const taskDTO: TaskDTO = {
                title: "Task 1",
                description: "Description of Task 1",
                dueDate: new Date(),
                completed: false,
                userId: "user1",
            };

            // Mock Firestore addDoc method to throw an error
            const errorMessage = "Failed to create task";
            const mockAddDoc = jest
                .spyOn(firestore, "addDoc")
                .mockRejectedValueOnce(new Error(errorMessage));

            // Act & Assert
            await expect(taskRepository.createTask(taskDTO)).rejects.toThrow(errorMessage);
        });
    });

    describe("getTasks", () => {
        it("should retrieve tasks from Firestore", async () => {
            // Arrange
            const userId = "user1";

            const mockQuerySnapshot: QuerySnapshot<DocumentData> = {
                forEach: jest.fn(),
                // Mock other QuerySnapshot methods as needed for testing
                // ...
            } as QuerySnapshot<DocumentData>;

            // Mock Firestore collection and getDocs methods
            const mockCollection = jest.spyOn(firestore, "collection").mockReturnValueOnce();
            const mockGetDocs = jest
                .spyOn(firestore, "getDocs")
                .mockResolvedValueOnce(mockQuerySnapshot);

            // Act
            await taskRepository.getTasks(userId);

            // Assert
            expect(mockCollection).toHaveBeenCalledWith(firestore, "users", userId, "tasks");
            expect(mockGetDocs).toHaveBeenCalledWith(mockCollection);
        });

        it("should map retrieved tasks to TaskDTOs", async () => {
            // Arrange
            const userId = "user1";

            const mockQuerySnapshot: QuerySnapshot<DocumentData> = {
                forEach: jest.fn(),
                // Mock other QuerySnapshot methods as needed for testing
                // ...
            } as QuerySnapshot<DocumentData>;

            // Mock Firestore collection and getDocs methods
            jest.spyOn(firestore, "collection").mockReturnValueOnce();
            jest.spyOn(firestore, "getDocs").mockResolvedValueOnce(mockQuerySnapshot);

            // Mock TaskMapper.toDTO method
            const mockToDTO = jest.spyOn(TaskMapper, "toDTO").mockReturnValueOnce({} as TaskDTO);

            // Act
            await taskRepository.getTasks(userId);

            // Assert
            expect(mockToDTO).toHaveBeenCalled();
        });

        it("should throw an error if retrieving tasks fails", async () => {
            // Arrange
            const userId = "user1";

            // Mock Firestore collection and getDocs methods to throw an error
            const errorMessage = "Failed to get tasks";
            jest.spyOn(firestore, "collection").mockReturnValueOnce();
            jest.spyOn(firestore, "getDocs").mockRejectedValueOnce(new Error(errorMessage));

            // Act & Assert
            await expect(taskRepository.getTasks(userId)).rejects.toThrow(errorMessage);
        });
    });
});
