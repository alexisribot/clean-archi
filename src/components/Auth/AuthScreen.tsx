import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as yup from "yup";
import { UserRepositoryInterface } from "../../infrastructure/data/repositories/UserRepository";
import AuthPresenter, { AuthPresenterView } from "./AuthPresenter";

interface AuthScreenProps {
    userRepository: UserRepositoryInterface;
}

interface RegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ userRepository }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = yup.object().shape({
        email: yup.string().required("Email is required").email("Email is not valid"),
        password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(/^(?=.*[!@#$%^&*])/, "Password must contain at least one special character"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords must match")
            .required("Confirm Password is required"),
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: yupResolver(validationSchema),
    });

    const authPresenterView: AuthPresenterView = {
        showLoading: () => setIsLoading(true),
        hideLoading: () => setIsLoading(false),
        showSignUpSuccess: () => {
            // Handle successful registration
        },
        showSignUpError: (error) => {
            // Handle registration error
        },
        showSignInSuccess: () => {
            // Handle successful login
        },
        showSignInError: (error) => {
            // Handle login error
        },
        showSignOutSuccess: () => {
            // Handle successful logout
        },
        showSignOutError: (error) => {
            // Handle logout error
        },
    };

    const authPresenter = new AuthPresenter(authPresenterView, userRepository);

    const handleSignIn = (data: RegisterFormData) => {
        authPresenter.signIn(data.email, data.password);
    };

    const handleSignUp = (data: RegisterFormData) => {
        authPresenter.signUp(data.email, data.password);
    };

    const toggleRegistering = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue</Text>
            <View style={styles.formContainer}>
                {/* <Form> */}
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={value}
                            onChangeText={(text) => onChange(text)}
                        />
                    )}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                <Controller
                    control={control}
                    name="password"
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Mot de passe"
                            value={value}
                            onChangeText={(text) => onChange(text)}
                            secureTextEntry
                        />
                    )}
                />
                {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                {isRegistering && (
                    <>
                        <Controller
                            control={control}
                            name="confirmPassword"
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirmer le mot de passe"
                                    value={value}
                                    onChangeText={(text) => onChange(text)}
                                    secureTextEntry
                                />
                            )}
                        />
                        {errors.confirmPassword && (
                            <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
                        )}
                    </>
                )}
                {/* </Form> */}
                {isLoading ? (
                    <ActivityIndicator style={styles.loader} />
                ) : (
                    <>
                        <Button
                            title={isRegistering ? "S'enregistrer" : "Se connecter"}
                            onPress={
                                isRegistering
                                    ? handleSubmit(handleSignUp)
                                    : handleSubmit(handleSignIn)
                            }
                            disabled={isSubmitting}
                        />
                        <Text style={styles.link} onPress={toggleRegistering}>
                            {isRegistering
                                ? "Déjà un compte ? Se connecter"
                                : "Pas de compte ? S'enregistrer"}
                        </Text>
                    </>
                )}
            </View>
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
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    loader: {
        marginTop: 10,
    },
    link: {
        color: "blue",
        marginTop: 10,
        textAlign: "center",
        textDecorationLine: "underline",
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    },
});

export default AuthScreen;
