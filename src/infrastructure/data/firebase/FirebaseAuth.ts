import { Unsubscribe, User, getAuth } from "firebase/auth";

class FirebaseAuth {
    static getCurrentUser() {
        return getAuth().currentUser;
    }

    static onAuthStateChanged(callback: (user: User | null) => void): Unsubscribe {
        return getAuth().onAuthStateChanged(callback);
    }
}

export default FirebaseAuth;
