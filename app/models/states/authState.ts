export interface AuthState {
    user: User | null;
    loading: boolean;
    error: any | null; // Specify the type of error
}