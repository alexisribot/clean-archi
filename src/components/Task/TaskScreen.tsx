import DateTimePicker from "@react-native-community/datetimepicker";
import { User } from "firebase/auth";
import React from "react";
import { Controller } from "react-hook-form";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { AddTaskInteractor } from "../../application/interactors/AddTaskInteractor";
import { GetTasksInteractor } from "../../application/interactors/GetTaskInteractor";
import { default as useTaskPresenter } from "./TaskPresenter";

interface TaskScreenProps {
    addTaskInteractor: AddTaskInteractor;
    getTasksInteractor: GetTasksInteractor;
    user: User;
}

const TaskScreen: React.FC<TaskScreenProps> = ({ addTaskInteractor, getTasksInteractor, user }) => {
    const { tasks, loading, error, onSubmit, errors, control, formatDueDate } = useTaskPresenter(
        user.uid,
        addTaskInteractor,
        getTasksInteractor
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Task</Text>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Title</Text>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                value={value}
                                onChangeText={(text) => onChange(text)}
                                style={styles.input}
                                placeholder="Title"
                            />
                        )}
                    />
                    {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Description</Text>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                value={value}
                                onChangeText={(text) => onChange(text)}
                                style={styles.textarea}
                                multiline
                                numberOfLines={4}
                                placeholder="Description"
                            />
                        )}
                    />
                    {errors.description && (
                        <Text style={styles.errorText}>{errors.description.message}</Text>
                    )}
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Due Date</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <DateTimePicker
                                value={value || new Date()}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    const currentDate = selectedDate || value;
                                    onChange(currentDate);
                                }}
                            />
                        )}
                        name="dueDate"
                    />
                    {errors.dueDate && (
                        <Text style={styles.errorText}>{errors.dueDate.message}</Text>
                    )}
                </View>
            </View>
            <Button title="Create" onPress={onSubmit} />

            <Text style={styles.title}>Tasks:</Text>
            {tasks && (
                <FlatList
                    data={tasks}
                    keyExtractor={(task) => task.title}
                    renderItem={({ item }) => (
                        <View style={styles.taskContainer}>
                            <Text style={styles.taskTitle}>{item.title}</Text>
                            <Text>{item.description}</Text>
                            <Text>Due Date: {item.dueDate.toISOString()}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    formContainer: {
        width: "100%",
    },
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        marginBottom: 5,
        fontWeight: "bold",
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    textarea: {
        height: 80,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        textAlignVertical: "top",
    },
    errorText: {
        color: "red",
        marginTop: 5,
    },
    taskContainer: {
        marginBottom: 10,
    },
    taskTitle: {
        fontWeight: "bold",
        marginBottom: 5,
    },
});

export default TaskScreen;
