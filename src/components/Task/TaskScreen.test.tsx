import { act, fireEvent, render, screen } from "@testing-library/react-native";
import TaskScreen from "./TaskScreen";

describe("TaskScreen", () => {
    let mockTaskRepository: { getTasks: any; createTask: any };

    beforeEach(() => {
        mockTaskRepository = {
            getTasks: jest.fn(),
            createTask: jest.fn(),
        };
    });

    test.only("renders task list correctly", async () => {
        const mockTasks = [
            { title: "Task 1", completed: false },
            { title: "Task 2", completed: true },
        ];
        mockTaskRepository.getTasks.mockResolvedValue(mockTasks);

        render(<TaskScreen taskRepository={mockTaskRepository} user={{ uid: "123" }} />);

        expect(mockTaskRepository.getTasks).toHaveBeenCalledWith("123");
    });

    test("creates new task on form submission", async () => {
        render(<TaskScreen taskRepository={mockTaskRepository} user={{ uid: "123" }} />);

        await act(async () => {
            const titleInput = screen.getByPlaceholderText("Title");
            const createButton = screen.getByText("Create"); // Update button text here

            // Enter the title of the new task
            fireEvent.changeText(titleInput, "New Task");

            // Submit the form
            fireEvent.press(createButton);

            expect(mockTaskRepository.createTask).toHaveBeenCalledWith("123", {
                title: "New Task",
                completed: false,
            });
        });
    });
});
