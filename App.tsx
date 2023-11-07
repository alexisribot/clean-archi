import { User } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AddTaskInteractor } from "./src/application/interactors/AddTaskInteractor";
import { GetTasksInteractor } from "./src/application/interactors/GetTaskInteractor";
import AuthScreen from "./src/components/Auth/AuthScreen";
import TaskScreen from "./src/components/Task/TaskScreen";
import { TaskValidationService } from "./src/domain/services/ValidateTask";
import FirebaseAuth from "./src/infrastructure/data/firebase/FirebaseAuth";
import TaskRepository from "./src/infrastructure/data/repositories/TaskRepository";
import UserRepository from "./src/infrastructure/data/repositories/UserRepository";
import FirebaseService from "./src/infrastructure/services/FirebaseService";

const firestore = getFirestore();
const firebaseService = new FirebaseService();
const userRepository = new UserRepository(firebaseService);
const taskRepository = new TaskRepository(firestore);
const validationService = new TaskValidationService();
const addTaskInteractor = new AddTaskInteractor(taskRepository, validationService);
const getTasksInteractor = new GetTasksInteractor(taskRepository);

export default function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        FirebaseAuth.onAuthStateChanged(async (user) => {
            setUser(user);
        });
    }, []);

    return (
        <View style={styles.container}>
            {!user && <AuthScreen userRepository={userRepository} />}
            {user && (
                <TaskScreen
                    user={user}
                    getTasksInteractor={getTasksInteractor}
                    addTaskInteractor={addTaskInteractor}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
