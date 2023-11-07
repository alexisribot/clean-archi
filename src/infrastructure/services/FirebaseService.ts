import { getApps, initializeApp } from "firebase/app";
import {
    UserCredential,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCIueLqUc4oSqxCEubJMnAMsSRhvyJ53Fk",
    authDomain: "my-adhd-a67bc.firebaseapp.com",
    projectId: "my-adhd-a67bc",
    storageBucket: "my-adhd-a67bc.appspot.com",
    messagingSenderId: "826734280361",
    appId: "1:826734280361:web:90225291cf9c20e4fb73b8",
    measurementId: "G-YHK0D377XW",
};

if (!getApps().length) {
    initializeApp(firebaseConfig);
}

class FirebaseService {
    async signInWithEmailAndPassword(email: string, password: string): Promise<void> {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
        } catch (error) {
            throw new Error("Failed to sign in user. " + (error as { message: string }).message);
        }
    }

    async createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
        try {
            const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
            return userCredential;
        } catch (error) {
            throw new Error("Failed to create user. " + (error as { message: string }).message);
        }
    }

    async signOut(): Promise<void> {
        try {
            await signOut(getAuth());
        } catch (error) {
            throw new Error("Failed to sign out user. " + (error as { message: string }).message);
        }
    }
}

export default FirebaseService;
