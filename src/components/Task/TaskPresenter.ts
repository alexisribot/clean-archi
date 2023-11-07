import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Control, FieldErrors, useForm } from "react-hook-form";
import * as yup from "yup";
import { TaskDTO } from "../../application/dtos/TaskDTO";
import { AddTaskInteractor } from "../../application/interactors/AddTaskInteractor";
import { GetTasksInteractor } from "../../application/interactors/GetTaskInteractor";

interface TaskPresenter {
    tasks: TaskDTO[];
    loading: boolean;
    error: string;
    onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
    errors: FieldErrors<Pick<TaskDTO, "title" | "description" | "dueDate">>;
    control: Control<Pick<TaskDTO, "title" | "description" | "dueDate">, any>;
    formatDueDate: (timestamp: { toDate: () => any }) => string;
}

const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    dueDate: yup.date().required("Due date is required"),
});

const useTaskPresenter = (
    userId: string,
    addTaskInteractor: AddTaskInteractor,
    getTaskInteractor: GetTasksInteractor
): TaskPresenter => {
    const [tasks, setTasks] = useState<TaskDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<Pick<TaskDTO, "title" | "description" | "dueDate">>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            title: "",
            description: "",
            dueDate: new Date(),
        },
    });

    const createTask = async (task: TaskDTO) => {
        setLoading(true);
        setError("");

        try {
            addTaskInteractor.execute(task);
            setTasks((prevTasks) => [...prevTasks, task]);
        } catch (error) {
            setError((error as { message: string }).message);
        }

        setLoading(false);
    };

    function formatDueDate(timestamp: { toDate: () => Date }) {
        const date = timestamp.toDate();
        return date.toLocaleDateString();
    }

    const getTasks = async (userId: string) => {
        setLoading(true);
        setError("");

        try {
            const tasks = await getTaskInteractor.execute(userId);
            setTasks(tasks);
        } catch (error) {
            setError((error as { message: string }).message);
        }

        setLoading(false);
    };

    useEffect(() => {
        getTasks(userId);
    }, [userId]);

    const onSubmit = handleSubmit((data) => {
        const task: TaskDTO = {
            ...data,
            completed: false,
            userId,
            priority: "low",
        };
        return createTask(task);
    });

    return {
        tasks,
        loading,
        error,
        onSubmit,
        errors,
        control,
        formatDueDate,
    };
};

export default useTaskPresenter;
