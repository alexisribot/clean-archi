// import TaskPresenter from "./TaskPresenter";

// describe("TaskPresenter", () => {
//     let presenter;
//     let mockTaskRepository;

//     beforeEach(() => {
//         mockTaskRepository = {
//             getTasks: jest.fn(),
//             createTask: jest.fn(),
//         };
//         presenter = new TaskPresenter("123", mockTaskRepository);
//     });

//     test("getTasks calls taskRepository.getTasks and returns tasks", async () => {
//         const mockTasks = [
//             { title: "Task 1", completed: false },
//             { title: "Task 2", completed: true },
//         ];
//         mockTaskRepository.getTasks.mockResolvedValue(mockTasks);

//         const userId = "123";
//         const tasks = await presenter.getTasks(userId);

//         expect(mockTaskRepository.getTasks).toHaveBeenCalledWith(userId);
//         expect(tasks).toEqual(mockTasks);
//     });

//     test("createTask calls taskRepository.createTask", async () => {
//         const mockTask = { title: "New Task", completed: false };

//         const userId = "123";
//         await presenter.createTask(userId, mockTask);

//         expect(mockTaskRepository.createTask).toHaveBeenCalledWith(userId, mockTask);
//     });
// });
