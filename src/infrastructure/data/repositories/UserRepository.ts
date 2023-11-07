import { User } from "firebase/auth";
import FirebaseService from "../../services/FirebaseService";

export interface UserRepositoryInterface {
    createUser(email: string, password: string): Promise<User>;
    signInUser(email: string, password: string): Promise<void>;
    signOutUser(): Promise<void>;
}

class UserRepository implements UserRepositoryInterface {
    private firebaseService: FirebaseService;

    constructor(firebaseService: FirebaseService) {
        this.firebaseService = firebaseService;
    }

    async createUser(email: string, password: string): Promise<User> {
        try {
            const { user } = await this.firebaseService.createUserWithEmailAndPassword(
                email,
                password
            );
            return user;
        } catch (error) {
            throw new Error("Failed to create user. " + (error as { message: string }).message);
        }
    }

    async signInUser(email: string, password: string): Promise<void> {
        try {
            await this.firebaseService.signInWithEmailAndPassword(email, password);
        } catch (error) {
            throw new Error("Failed to sign in user. " + (error as { message: string }).message);
        }
    }

    async signOutUser(): Promise<void> {
        try {
            await this.firebaseService.signOut();
        } catch (error) {
            throw new Error("Failed to sign out user. " + (error as { message: string }).message);
        }
    }
}

export default UserRepository;
