import { Timestamp } from "firebase/firestore";

export type Priority = "low" | "medium" | "high";

export interface Task {
    title: string;
    description: string;
    dueDate: Timestamp;
    completed: boolean;
    priority: Priority;
    userId: string;
}
