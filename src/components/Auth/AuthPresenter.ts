import { UserRepositoryInterface } from "../../infrastructure/data/repositories/UserRepository";

export interface AuthPresenterView {
    showLoading?(): void;
    hideLoading?(): void;
    showSignUpSuccess?(): void;
    showSignUpError?(errorMessage: string): void;
    showSignInSuccess?(): void;
    showSignInError?(errorMessage: string): void;
    showSignOutSuccess?(): void;
    showSignOutError?(errorMessage: string): void;
}

class AuthPresenter implements AuthPresenterView {
    private view: AuthPresenterView;
    private userRepository: UserRepositoryInterface;

    constructor(view: AuthPresenterView, userRepository: UserRepositoryInterface) {
        this.view = view;
        this.userRepository = userRepository;
    }

    showLoading(): void {
        if (this.view && this.view.showLoading) {
            this.view.showLoading();
        }
    }

    hideLoading(): void {
        if (this.view && this.view.hideLoading) {
            this.view.hideLoading();
        }
    }

    showSignUpSuccess(): void {
        if (this.view && this.view.showSignUpSuccess) {
            this.view.showSignUpSuccess();
        }
    }

    showSignUpError(errorMessage: string): void {
        if (this.view && this.view.showSignUpError) {
            this.view.showSignUpError(errorMessage);
        }
    }

    showSignInSuccess(): void {
        if (this.view && this.view.showSignInSuccess) {
            this.view.showSignInSuccess();
        }
    }

    showSignInError(errorMessage: string): void {
        if (this.view && this.view.showSignInError) {
            this.view.showSignInError(errorMessage);
        }
    }

    showSignOutSuccess(): void {
        if (this.view && this.view.showSignOutSuccess) {
            this.view.showSignOutSuccess();
        }
    }

    showSignOutError(errorMessage: string): void {
        if (this.view && this.view.showSignOutError) {
            this.view.showSignOutError(errorMessage);
        }
    }

    async signUp(email: string, password: string) {
        this.showLoading();
        try {
            await this.userRepository.createUser(email, password);
            this.showSignUpSuccess();
        } catch (error) {
            this.showSignUpError((error as { message: string }).message);
        } finally {
            this.hideLoading();
        }
    }

    async signIn(email: string, password: string) {
        this.showLoading();
        try {
            await this.userRepository.signInUser(email, password);
            this.showSignInSuccess();
        } catch (error) {
            this.showSignInError((error as { message: string }).message);
        } finally {
            this.hideLoading();
        }
    }

    async signOut() {
        this.showLoading();
        try {
            await this.userRepository.signOutUser();
            this.showSignOutSuccess();
        } catch (error) {
            this.showSignOutError((error as { message: string }).message);
        } finally {
            this.hideLoading();
        }
    }
}

export default AuthPresenter;
