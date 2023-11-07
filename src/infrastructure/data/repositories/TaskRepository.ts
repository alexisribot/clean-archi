import {
    DocumentData,
    Firestore,
    QuerySnapshot,
    addDoc,
    collection,
    getDocs,
} from "firebase/firestore";
import { Task } from "../../../domain/entities/Task";
import { TaskRepository } from "../../../domain/repositories/TaskRepository";

class FirebaseTaskRepository implements TaskRepository {
    private firestore: Firestore;

    constructor(firestore: Firestore) {
        this.firestore = firestore;
    }

    async createTask(task: Task): Promise<void> {
        try {
            const docRef = collection(this.firestore, "users", task.userId, "tasks");
            await addDoc(docRef, task);
        } catch (error) {
            throw new Error("Failed to create task. " + (error as { message: string }).message);
        }
    }

    async getTasks(userId: string): Promise<Task[]> {
        try {
            const docRef = collection(this.firestore, "users", userId, "tasks");
            const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(docRef);

            const tasks: Task[] = [];
            querySnapshot.forEach((doc) => {
                const taskEntity = doc.data() as Task;
                tasks.push(taskEntity);
            });

            return tasks;
        } catch (error) {
            throw new Error("Failed to get tasks. " + (error as { message: string }).message);
        }
    }
}

export default FirebaseTaskRepository;
